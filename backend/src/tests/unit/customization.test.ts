import { customizationResolver } from '../../graphql/resolvers/customization.resolver';
import { CustomizationModel } from '../../models/customization.model';

jest.mock('../../models/customization.model');

describe('Unit test: customizationResolver', () => {
    describe('Query: customizations', () => {
        it('should return a list of customizations', async () => {
            const mockCustomizations = [
                { name: 'sugar', price: 0.5 },
                { name: 'milk', price: 0.6 },
            ];

            (CustomizationModel.find as jest.Mock).mockResolvedValue(mockCustomizations);

            const result = await customizationResolver.Query.getCustomizations();

            expect(result).toEqual(mockCustomizations);
        });

        it('should throw an error if find fails', async () => {
            (CustomizationModel.find as jest.Mock).mockRejectedValue(new Error('An error occurred while getting customizations. Please try again later.'));

            await expect(customizationResolver.Query.getCustomizations()).rejects.toThrow('An error occurred while getting customizations. Please try again later.');
        });
    });
});