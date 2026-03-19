import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../assets/styles/globals.css";
import { cn } from "@/lib/utils";
import { APP_DESCRIPTION, APP_NAME, SERVER_URL } from "../lib/costants/index";
import { URL } from "url";
import { ThemeProvider } from "next-themes";


const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
 metadataBase: process.env.SERVER_URL 
  ? new URL(process.env.SERVER_URL) 
  : new URL('http://localhost:3000'), // fallback
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-sans", inter.variable)}
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {" "}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
