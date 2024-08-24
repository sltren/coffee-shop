import { gql } from "@apollo/client";

export const PLACE_ORDERS = gql`
  mutation PlaceOrders($orders: [CoffeeOrderInput!]!) {
    placeOrders(orders: $orders) {
      coffeeType
      size
      quantity
      customizations {
        name
        price
        quantity
      }
      totalPrice
    }
  }
`;