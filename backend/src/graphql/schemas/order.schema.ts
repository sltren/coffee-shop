import { gql } from 'apollo-server';

export const orderSchema = gql`
  type CoffeeOrder {
    id: ID
    orderId: String!
    coffeeType: String!
    size: String!
    quantity: Int!
    customizations: [OrderCustomization!]!
    totalPrice: Float!
  }

  type OrderCustomization {
    name: String!
    quantity: Int!
    price: Float!
  }

  input CustomizationInput {
    name: String!
    quantity: Int!
  }

  input CoffeeOrderInput {
    coffeeType: String!
    size: String!
    quantity: Int!
    customizations: [CustomizationInput!]!
  }

  extend type Mutation {
    placeOrders(orders: [CoffeeOrderInput!]!): [CoffeeOrder!]!
  }
`;