import gql from "graphql-tag";

export default gql`
  mutation AddOrder($orderInput: OrderInput!) {
    addOrder(order: $orderInput) {
      orderId
    }
  }
`;