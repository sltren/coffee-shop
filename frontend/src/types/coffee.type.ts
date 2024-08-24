export interface CoffeePrices {
  small: number;
  medium: number;
  large: number;
}

export interface CoffeeType {
  id: string;
  name: string;
  prices: CoffeePrices;
}