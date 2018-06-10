import gql from "graphql-tag";

export default gql`
  mutation($gigId: ID!, $text: String!) {
    createComment(gigId: $gigId, text: $text){
      id
      text
      insertedAt
      user {
        id 
        avatar
        firstName
        lastName
      }
    }
  }
`