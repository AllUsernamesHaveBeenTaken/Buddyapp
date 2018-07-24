import gql from "graphql-tag";

export default gql`
  mutation($gigId: ID!) {
    goingGig(gigId: $gigId)
  }
`