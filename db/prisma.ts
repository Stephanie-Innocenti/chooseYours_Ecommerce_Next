/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pool, PoolConfig, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

const poolConfig: PoolConfig = {
  connectionString: process.env.DATABASE_URL,
};

const pool = new Pool(poolConfig);

// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.
const adapter = new PrismaNeon(pool.options);

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product: { price: { toString: () => any; }; }) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product: { rating: { toString: () => any; }; }) {
          return product.rating.toString();
        },
      },
    },
    cart: {
      itemsPrice: {
        // needs: { itemsPrice: true },
        compute(cart: { itemsPrice: { toString: () => any; }; }) {
          return cart.itemsPrice.toString();
        },
      },
      shippingPrice: {
        // needs: { shippingPrice: true },
        compute(cart: { shippingPrice: { toString: () => any; }; }) {
          return cart.shippingPrice.toString();
        },
      },
      taxPrice: {
        // needs: { taxPrice: true },
        compute(cart: { taxPrice: { toString: () => any; }; }) {
          return cart.taxPrice.toString();
        },
      },
      totalPrice: {
        // needs: { totalPrice: true },
        compute(cart: { totalPrice: { toString: () => any; }; }) {
          return cart.totalPrice.toString();
        },
      },
    },
    order: {
      itemsPrice: {
        // needs: { itemsPrice: true },
        compute(cart: { itemsPrice: { toString: () => any; }; }) {
          return cart.itemsPrice.toString();
        },
      },
      shippingPrice: {
        // needs: { shippingPrice: true },
        compute(cart: { shippingPrice: { toString: () => any; }; }) {
          return cart.shippingPrice.toString();
        },
      },
      taxPrice: {
        // needs: { taxPrice: true },
        compute(cart: { taxPrice: { toString: () => any; }; }) {
          return cart.taxPrice.toString();
        },
      },
      totalPrice: {
        // needs: { totalPrice: true },
        compute(cart: { totalPrice: { toString: () => any; }; }) {
          return cart.totalPrice.toString();
        },
      },
    },
    orderItem: {
      price: {
        compute(cart: { price: { toString: () => any; }; }) {
          return cart.price.toString();
        },
      },
    },
  },
});

export type Prisma = typeof prisma;
