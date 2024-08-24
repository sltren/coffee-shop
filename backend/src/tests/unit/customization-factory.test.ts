import { CustomizationFactory } from '../../factories/customization.factory';

describe('Unit test: CustomizationFactory', () => {
    it('should create a sugar customization with the correct price, name, instance', () => {
      const name = 'sugar';
      const price = 0.5;
      const customization = CustomizationFactory.createCustomization(name, price);
  
      expect(customization.getPrice()).toBe(price);
      expect(customization.getName()).toBe(name);
      expect(customization).toBeInstanceOf(CustomizationFactory.createCustomization(name, price).constructor);
    });
  
    it('should create a milk customization with the correct price, name, instance', () => {
      const name = 'milk';
      const price = 0.6;
      const customization = CustomizationFactory.createCustomization(name, price);
  
      expect(customization.getPrice()).toBe(price);
      expect(customization.getName()).toBe(name);
      expect(customization).toBeInstanceOf(CustomizationFactory.createCustomization(name, price).constructor);
    });
  
    it('should create a cream customization with the correct price, name, instance', () => {
      const name = 'cream';
      const price = 0.7;
      const customization = CustomizationFactory.createCustomization(name, price);
  
      expect(customization.getPrice()).toBe(price);
      expect(customization.getName()).toBe(name);
      expect(customization).toBeInstanceOf(CustomizationFactory.createCustomization(name, price).constructor);
    });
  
    it('should create a caramel customization with the correct price, name, instance', () => {
      const name = 'caramel';
      const price = 0.8;
      const customization = CustomizationFactory.createCustomization(name, price);
  
      expect(customization.getPrice()).toBe(price);
      expect(customization.getName()).toBe(name);
      expect(customization).toBeInstanceOf(CustomizationFactory.createCustomization(name, price).constructor);
    });
  
    it('should throw an error for an unknown customization', () => {
      const name = 'unknown';
      const price = 1.0;
  
      expect(() => CustomizationFactory.createCustomization(name, price)).toThrow(`Unknown customization: ${name}`);
    });
  });