interface Customization {
  getName(): string;
  getPrice(): number;
}

class BaseCustomization implements Customization {
  private name: string;
  private price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }
}

class Sugar extends BaseCustomization {}
class Milk extends BaseCustomization {}
class Cream extends BaseCustomization {}
class Caramel extends BaseCustomization {}

export class CustomizationFactory {
  static createCustomization(name: string, price: number): Customization {
    switch (name) {
      case 'sugar':
        return new Sugar(name, price);
      case 'milk':
        return new Milk(name, price);
      case 'cream':
        return new Cream(name, price);
      case 'caramel':
        return new Caramel(name, price);
      default:
        throw new Error(`Unknown customization: ${name}`);
    }
  }
}