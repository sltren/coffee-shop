import { gql } from '@apollo/client';

export const GET_COFFEE_TYPES = gql`
  query GetCoffeeTypes {
    getCoffeeTypes {
      id
      name
      prices {
        small
        medium
        large
      }
    }
  }
`;