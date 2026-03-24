/* eslint-disable @typescript-eslint/no-explicit-any */

import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import ws from "ws";

// Configure Neon WebSocket support
neonConfig.webSocketConstructor = ws;

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is required");
}

const adapter = new PrismaNeon({ connectionString });

export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product: any) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product: any) {
          return product.rating.toString();
        },
      },
    },
    cart: {
      itemsPrice: {
        compute(cart: any) {
          return cart.itemsPrice.toString();
        },
      },
      shippingPrice: {
        compute(cart: any) {
          return cart.shippingPrice.toString();
        },
      },
      taxPrice: {
        compute(cart: any) {
          return cart.taxPrice.toString();
        },
      },
      totalPrice: {
        compute(cart: any) {
          return cart.totalPrice.toString();
        },
      },
    },
    order: {
      itemsPrice: {
        compute(order: any) {
          return order.itemsPrice.toString();
        },
      },
      shippingPrice: {
        compute(order: any) {
          return order.shippingPrice.toString();
        },
      },
      taxPrice: {
        compute(order: any) {
          return order.taxPrice.toString();
        },
      },
      totalPrice: {
        compute(order: any) {
          return order.totalPrice.toString();
        },
      },
    },
    orderItem: {
      price: {
        compute(orderItem: any) {
          return orderItem.price.toString();
        },
      },
    },
  },
});
