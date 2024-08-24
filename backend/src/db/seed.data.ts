import { connectDB, disconnectDB } from './mongo.db';
import { CoffeeModel } from '../models/coffee.model';
import { CustomizationModel } from '../models/customization.model';

const coffeesData = [
  { name: 'latte', prices: { small: 3.0, medium: 3.5, large: 4.0 } },
  { name: 'macchiato', prices: { small: 3.5, medium: 4.0, large: 4.5 } },
  { name: 'espresso', prices: { small: 2.0, medium: 2.5, large: 3.0 } },
  { name: 'americano', prices: { small: 2.2, medium: 3.0, large: 3.5 } },
  { name: 'cappuccino', prices: { small: 3.0, medium: 3.5, large: 4.0 } },
];

const customizationsData = [
  { name: 'sugar', price: 0.5 },
  { name: 'milk', price: 0.6 },
  { name: 'cream', price: 0.7 },
  { name: 'caramel', price: 0.8 },
];

const seedData = async () => {
  try {
    await connectDB();
    await CoffeeModel.insertMany(coffeesData);
    await CustomizationModel.insertMany(customizationsData);
    console.log('Data seeded');
  } catch(error){
    console.log(`Data not seeded. Error: ${error}`);
  } finally {
    await disconnectDB();
  }
};

seedData();