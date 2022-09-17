import mongoose from 'mongoose';
import { ProductsSchema } from './ProductsSchema.js';

const Carritos = new mongoose.Schema({
  timestamp: { type: Date, required: true },
  productos: { type: [ProductsSchema], required: true },
});

export { Carritos };
