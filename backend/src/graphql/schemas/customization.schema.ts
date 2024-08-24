import { gql } from 'apollo-server';

export const customizationSchema = gql`
  type Customization {
    id: ID
    name: String!
    price: Float!
  }

  extend type Query {
    getCustomizations: [Customization!]!
  }
`;