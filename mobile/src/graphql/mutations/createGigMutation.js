import gql from "graphql-tag";

import { FeedGigFragment } from "../../screens/FeedScreen/fragments";

export default gql`
  mutation($title: String!, $location: String!, $when: String!) {
    createGig(title: $title, location: $location, when: $when){
      ...feedGig
    }
  }
  ${FeedGigFragment}
`