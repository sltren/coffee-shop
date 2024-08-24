import { gql } from '@apollo/client';

export const GET_CUSTOMIZATIONS = gql`
  query GetCustomizations {
    getCustomizations {
      id
      name
      price
    }
  }
`;