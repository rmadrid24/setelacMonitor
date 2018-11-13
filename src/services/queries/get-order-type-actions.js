import gql from "graphql-tag";

export default gql`
  query GetOrderActions($typeId: String) {
    getOrderActions(typeId: $typeId) {
		  id
      label
      description
    }
  }
`;