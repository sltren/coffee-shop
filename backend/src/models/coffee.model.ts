import mongoose, { Schema, Document } from 'mongoose';

interface ICoffee extends Document {
  name: string;
  prices: {
    small: number;
    medium: number;
    large: number;
  };
}

const CoffeeSchema: Schema = new Schema({
  name: { type: String, required: true },
  prices: {
    small: { type: Number, required: true },
    medium: { type: Number, required: true },
    large: { type: Number, required: true },
  },
});

export const CoffeeModel = mongoose.model<ICoffee>('Coffee', CoffeeSchema);
