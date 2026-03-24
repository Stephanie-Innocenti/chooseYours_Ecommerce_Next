/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { z } from "zod";
import {
  cartItemSchema,
  insertCartSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  insertProductSchema,
  insertReviewSchema,
  shippingAddressSchema,
  paymentResultSchema,
} from "@/lib/validators";

export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  name: string;
  createdAt: Date;
  rating : any;
};

export type Cart = z.infer<typeof insertCartSchema>;
export type CartItem = z.infer<typeof cartItemSchema>;
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  name: string;
  createdAt: Date;
  isPaid: Boolean;
  isDelivered: Boolean;
  paidAt: Date | null;
  deliveredAt: Date | null;
  orderItems: OrderItem[];
  user: { name: string; email: string };
};
export type Review = z.infer<typeof insertReviewSchema>;
export type PaymentResult = z.infer<typeof paymentResultSchema>;
