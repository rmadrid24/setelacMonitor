import gql from "graphql-tag";

export default gql`
  mutation AddOrder($order: OrderInput!) {
    addOrder(order: $order) {
      id
    }
  }
`;