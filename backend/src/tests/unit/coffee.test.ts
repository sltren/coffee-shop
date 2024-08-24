import { coffeeResolver } from "../../graphql/resolvers/coffee.resolver";
import { CoffeeModel } from '../../models/coffee.model';

jest.mock('../../models/coffee.model');

describe('Unit test: coffeeResolver', () => {
    describe('Query: coffeeTypes', () => {
        it('should return a list of coffee types', async () => {
          const mockCoffeeTypes = [
            { name: 'espresso', prices: { small: 2, medium: 2.5, large: 3 } },
            { name: 'latte', prices: { small: 3, medium: 3.5, large: 4 } },
          ];

          (CoffeeModel.find as jest.Mock).mockResolvedValue(mockCoffeeTypes);

          const result = await coffeeResolver.Query.getCoffeeTypes();

          expect(result).toEqual(mockCoffeeTypes);
        });

        it('should throw an error if find fails', async () => {
          (CoffeeModel.find as jest.Mock).mockRejectedValue(new Error('An error occurred while getting coffee types. Please try again later.'));

          await expect(coffeeResolver.Query.getCoffeeTypes()).rejects.toThrow('An error occurred while getting coffee types. Please try again later.');
        });
    });
});