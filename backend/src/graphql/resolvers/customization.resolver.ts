import { CustomizationModel } from '../../models/customization.model';

export const customizationResolver = {
    Query: {
        getCustomizations: async () => {
            try {
                return await CustomizationModel.find();
            } catch (error) {
                console.log(`Getting customizations error: ${error}`);
                throw new Error(`An error occurred while getting customizations. Please try again later.`);
            }
        },
    },
};
