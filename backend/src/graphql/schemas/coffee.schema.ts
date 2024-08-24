import { gql } from "apollo-server";

export const coffeeSchema = gql`
  type CoffeeType {
    id: ID
    name: String!
    prices: CoffeePrices!
  }

  type CoffeePrices {
    small: Float!
    medium: Float!
    large: Float!
  }

  extend type Query {
    getCoffeeTypes: [CoffeeType!]!
  }
`;
