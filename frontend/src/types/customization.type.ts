export interface BaseCustomization {
  name: string;
  quantity: number;
}

export interface Customization extends BaseCustomization {
  id: string;
  price: number;
}