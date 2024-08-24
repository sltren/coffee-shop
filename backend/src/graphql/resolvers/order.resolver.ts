import { v4 as uuidv4 } from 'uuid';
import { CustomizationFactory } from '../../factories/customization.factory';
import { CoffeeModel } from '../../models/coffee.model';
import { CustomizationModel } from '../../models/customization.model';
import { CoffeeOrder, IOrder, OrderModel } from '../../models/order.model';

export const orderResolver = {
    Mutation: {
        placeOrders: async (_: any, { orders }: { orders: CoffeeOrder[] }): Promise<IOrder[]> => {
            try {
                const orderId = uuidv4();
                const placedOrders = await Promise.all(orders.map(async order => {
                    console.log(`Processing order for coffee type: ${order.coffeeType}`);
                    const coffeeTypeData = await CoffeeModel.findOne({ name: order.coffeeType });
                    if (!coffeeTypeData) {
                        console.log(`Coffee type ${order.coffeeType} not found`);
                        throw new Error(`Coffee type ${order.coffeeType} not found`);
                    }
            
                    const basePrice = coffeeTypeData.prices[order.size];
                    let totalPrice = basePrice * order.quantity;
            
                    const orderCustomizations = await Promise.all(order.customizations.map(async customization => {
                        console.log(`Processing customization: ${customization.name}`);
                        const customizationData = await CustomizationModel.findOne({ name: customization.name });
                        if (!customizationData) {
                            console.log(`Customization ${customization.name} not found`);
                            throw new Error(`Customization ${customization.name} not found`);
                        }
                
                        const customizationObj = CustomizationFactory.createCustomization(customization.name, customizationData.price);
                        totalPrice += customizationObj.getPrice() * customization.quantity * order.quantity;
                
                        return {
                            name: customization.name,
                            quantity: customization.quantity,
                            price: customizationData.price,
                        };
                    }));
            
                    const placeOrder = new OrderModel({
                        orderId, 
                        coffeeType: order.coffeeType,
                        size: order.size,
                        quantity: order.quantity,
                        customizations: orderCustomizations,
                        totalPrice,
                    });
            
                    console.log(`Saving new order: ${JSON.stringify(placeOrder)}`);
                    return await placeOrder.save();
                }));

                console.log(`Placed orders: ${JSON.stringify(placedOrders)}`);
                return placedOrders;
            } catch (error) {
                console.log(`Placing orders error: ${error}`);
                throw new Error(`An error occurred while placing orders. Please try again later.`);
            }
        },
    },
};
