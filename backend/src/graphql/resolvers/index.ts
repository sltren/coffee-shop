import { coffeeResolver } from './coffee.resolver';
import { customizationResolver } from './customization.resolver';
import { orderResolver } from './order.resolver';

export const resolvers = {
  Query: {
    ...coffeeResolver.Query,
    ...customizationResolver.Query,
  },
  Mutation: {
    ...orderResolver.Mutation,
  },
};