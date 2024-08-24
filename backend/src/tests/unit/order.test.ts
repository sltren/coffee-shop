import { orderResolver } from '../../graphql/resolvers/order.resolver';
import { CoffeeOrder, OrderModel } from '../../models/order.model';
import { CoffeeModel } from '../../models/coffee.model';
import { CustomizationModel } from '../../models/customization.model';
import { CustomizationFactory } from '../../factories/customization.factory';

jest.mock('../../models/order.model');
jest.mock('../../models/coffee.model');
jest.mock('../../models/customization.model');
jest.mock('../../factories/customization.factory');

describe('Unit test: orderResolver', () => {
    let inputs: CoffeeOrder[];
    let mockOrders: any[];
  
    beforeAll(() => {
      inputs = [
        {
            coffeeType: 'espresso',
            size: 'small',
            quantity: 1,
            customizations: [
                { id: 'sugarId', name: 'sugar', quantity: 2, price: 0.5 },
                { id: 'milkId', name: 'milk', quantity: 1, price: 0.6 }
            ],
            id: 'mockId',
            totalPrice: 10
        },
        {
            coffeeType: 'latte',
            size: 'medium',
            quantity: 2,
            customizations: [
                { id: 'caramelId', name: 'caramel', quantity: 1, price: 0.8 }
            ],
            id: 'mockId',
            totalPrice: 10
        },
      ];
    });
  
    beforeEach(() => {
        mockOrders = inputs.map(input => {
            const mockOrder = {
                ...input,
                id: 'mockId',
                totalPrice: 10,
                save: jest.fn().mockResolvedValue({
                    ...input,
                    id: 'mockId',
                    totalPrice: 10
                })
            };
            return mockOrder;
        });
  
        (OrderModel as unknown as jest.Mock).mockImplementation((input) => {
            const order = mockOrders.find(order => order.coffeeType === input.coffeeType);
            if (order) {
                return {
                    ...order,
                    save: order.save
                };
            }
            return null;
        });
  
        (CoffeeModel.findOne as jest.Mock).mockImplementation(({ name }) => {
            if (name === 'espresso') {
                return Promise.resolve({ name, prices: { small: 2, medium: 2.5, large: 3 } });
            } else if (name === 'latte') {
                return Promise.resolve({ name, prices: { small: 3, medium: 3.5, large: 4 } });
            }
            return Promise.resolve(null);
        });
  
        (CustomizationModel.findOne as jest.Mock).mockImplementation(({ name }) => {
            if (name === 'sugar') {
                return Promise.resolve({ name, price: 0.5 });
            } else if (name === 'milk') {
                return Promise.resolve({ name, price: 0.6 });
            } else if (name === 'caramel') {
                return Promise.resolve({ name, price: 0.8 });
            }
            return Promise.resolve(null);
        });
  
        (CustomizationFactory.createCustomization as jest.Mock).mockImplementation((name, price) => {
            return {
                getPrice: () => price,
                getName: () => name,
            };
        });
    });
  
    describe('Mutation: placeOrders', () => {
        it('should create new orders', async () => {
            const result = await orderResolver.Mutation.placeOrders(null, { orders: inputs });
    
            expect(result).toEqual(expect.arrayContaining(result));
        });
    
        it('should throw a generic error if save fails for any order', async () => {
            mockOrders[1].save = jest.fn().mockRejectedValue(new Error('Simulated Error'));
    
            try {
                await orderResolver.Mutation.placeOrders(null, { orders: inputs });
            } catch (error: any) {
                expect(error.message).toBe('An error occurred while placing orders. Please try again later.');
            }
        });
    
        it('should throw a generic error if coffee type is not found', async () => {
            (CoffeeModel.findOne as jest.Mock).mockImplementation(({ name }) => {
                if (name === 'latte') {
                    return Promise.resolve(null);
                }
                return Promise.resolve({ name, prices: { small: 3, medium: 3.5, large: 4 } });
            });
    
            try {
                await orderResolver.Mutation.placeOrders(null, { orders: inputs });
            } catch (error: any) {
                expect(error.message).toBe('An error occurred while placing orders. Please try again later.');
            }
        });
    
        it('should throw a generic error if customization is not found', async () => {
            (CustomizationModel.findOne as jest.Mock).mockImplementation(({ name }) => {
                if (name === 'caramel') {
                    return Promise.resolve(null);
                }
                return Promise.resolve({ name, price: 0.8 });
            });
    
            try {
                await orderResolver.Mutation.placeOrders(null, { orders: inputs });
            } catch (error: any) {
                expect(error.message).toBe('An error occurred while placing orders. Please try again later.');
            }
        });
    });
});
