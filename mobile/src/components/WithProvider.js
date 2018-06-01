import React, { Component } from 'react'
import { ApolloProvider } from "react-apollo";

import { client } from "../graphql";

export default function WithProvider(WrapperComponent) {
  return class Cp extends Component {
    render(){
      return (
        <ApolloProvider client={client}>
          <WrapperComponent {...this.props} />
        </ApolloProvider>
      )
    }
  }
}