import gql from "graphql-tag";

export default gql`
  query GetOrderTypes {
    getOrderTypes {
		  id
      label
      description
    }
  }
`;