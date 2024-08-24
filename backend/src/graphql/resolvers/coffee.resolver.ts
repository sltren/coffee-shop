import { CoffeeModel } from '../../models/coffee.model';

export const coffeeResolver = {
    Query: {
        getCoffeeTypes: async () => {
            try {
                return await CoffeeModel.find();
            } catch (error) {
                console.log(`Getting coffee types error: ${error}`);
                throw new Error(`An error occurred while getting coffee types. Please try again later.`);
            }
        },
    },
};
