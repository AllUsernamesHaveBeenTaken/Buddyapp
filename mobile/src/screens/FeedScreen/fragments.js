import gql from "graphql-tag";

export const FeedGigFragment = gql`
  fragment feedGig on Gig {
    id
    title
    location
    when
    isFavorited,
    isGoing,
    user {
      firstName,
      lastName,
      avatar
    }
  }
`