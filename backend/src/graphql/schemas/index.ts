import { gql } from 'apollo-server';
import { coffeeSchema } from './coffee.schema';
import { customizationSchema } from './customization.schema';
import { orderSchema } from './order.schema';

const baseSchema = gql`
  type Query
  type Mutation
`;

export const typeDefs = [
  baseSchema,
  coffeeSchema,
  customizationSchema,
  orderSchema,
];