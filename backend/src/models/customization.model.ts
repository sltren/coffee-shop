import mongoose, { Document, Schema, model } from 'mongoose';

export interface BaseCustomization {
    name: string;
    quantity: number;
}

export interface Customization extends BaseCustomization {
id: string;
price: number;
}

export interface ICustomization extends Document {
name: string;
price: number;
}

const CustomizationSchema: Schema = new Schema({
name: { type: String, required: true },
price: { type: Number, required: true },
});

export const CustomizationModel = mongoose.model<ICustomization>('Customization', CustomizationSchema);