import { BaseCustomization, Customization } from './customization.type';

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

export interface PlaceOrdersData {
  placeOrders: CoffeeOrder[];
}

export interface PlaceOrdersVariables {
  orders: OrderInput[];
}

export interface OrderDetails extends CoffeeOrder {}