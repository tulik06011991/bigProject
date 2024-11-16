// src/products/schemas/product.schema.ts
import { Schema, Document } from 'mongoose';

export const ProductSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: false },  // Ixtiyoriy
});

export interface Product extends Document {
  id: string;  // MongoDB da `id` avtomatik ravishda `ObjectId` bo'ladi
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
}
