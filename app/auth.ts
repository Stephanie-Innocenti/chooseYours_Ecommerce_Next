/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";
import { prisma } from '@/public/sample-data/db/prisma';
import { compareSync } from "bcrypt-ts-edge";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthConfig } from "next-auth";
import { PrismaClient } from "../prisma/generated/client/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { NextResponse } from "next/server";
const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaNeon({ connectionString });
const basePrisma = new PrismaClient({ adapter });
export const config ={
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),

  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        const user = await (basePrisma.user as any).findFirst({
          where: {
            email: credentials.email as string,
          },
        });

        if (user && user.password) {
          const isMatch = await compareSync(
            credentials.password as string,
            user.password,
          );
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              role: user.role,
              email: user.email,
            };
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, user, trigger, token }:any) {
      session.user.id = token.sub;
      session.user.role = token.role;
      session.user.name = token.name;
      if (trigger === "update") {
        session.user.name = user.name;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }:any) {
      // Assign user fields to token
      if (user) {
        token.id = user.id;
        token.role = user.role;

        // If user has no name then use the email
        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0];

          // Update database to reflect the token name
          await basePrisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }

        // if (trigger === 'signIn' || trigger === 'signUp') {
        //   const cookiesObject = await cookies();
        //   const sessionCartId = cookiesObject.get('sessionCartId')?.value;

        //   if (sessionCartId) {
        //     const sessionCart = await prisma.cart.findFirst({
        //       where: { sessionCartId },
        //     });

        //     if (sessionCart) {
        //       // Delete current user cart
        //       await prisma.cart.deleteMany({
        //         where: { userId: user.id },
        //       });

        //       // Assign new cart
        //       await prisma.cart.update({
        //         where: { id: sessionCart.id },
        //         data: { userId: user.id },
        //       });
        //     }
        //   }
        }
            return token;
      },
      authorized({request,auth}:any){
        //check for session cart cookie
        if(!request.cookies.get('sessionCartId')){
          const sessionCartId = crypto.randomUUID();
          const  requestHeaders = new Headers(request.headers);
          const response = NextResponse.next({
            request:{
              headers:requestHeaders
            }
          })
          response.cookies.set('sessionCartId', sessionCartId);
          return response;
        }
        else return true;
      }

      // // Handle session updates
      // if (session?.user.name && trigger === 'update') {
      //   token.name = session.user.name;
      // }

  
    // },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
