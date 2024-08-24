import mongoose, { Schema, Document } from 'mongoose';
import { BaseCustomization, Customization } from './customization.model';

export interface BaseOrder {
  coffeeType: string;
  size: 'small' | 'medium' | 'large';
  quantity: number;
  customizations: BaseCustomization[];
}

export interface OrderInput extends BaseOrder {}

export interface OrderCustomization extends Customization {}

export interface CoffeeOrder extends BaseOrder {
  id: string;
  customizations: OrderCustomization[];
  totalPrice: number;
}

export interface IOrder extends Document, BaseOrder {
  orderId: string;
  customizations: OrderCustomization[];
  totalPrice: number;
}

const OrderCustomizationSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema: Schema = new Schema({
  orderId: { type: String, required: true },
  coffeeType: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  customizations: { type: [OrderCustomizationSchema], required: true },
  totalPrice: { type: Number, required: true },
});

export const OrderModel = mongoose.model<IOrder>('Order', OrderSchema);
