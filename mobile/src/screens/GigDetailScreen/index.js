import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
})

const GET_COMMENTS = gql`
  query Comments($gigId: ID!) {
    comments(gigId: $gigId){
      id
      text
      insertedAt
      user {
        id 
        avatar
        firstName
      }
    }
  }
`

class GigDetailScreen extends PureComponent {
  state = {  }
  render() {
    return (
      <Query query={GET_COMMENTS} variables={{gigId: this.props.gigId}}>
        {({ loading, error, data}) => {
          console.log(data)
          if(loading) {
            return (
              <View style={styles.root}>
                <ActivityIndicator size='large' />
              </View>
            )
          }
          return (
            <ScrollView>
              <Text>{JSON.stringify(data)}</Text>
            </ScrollView>
          )
        }}
      </Query>
    );
  }
}

export default GigDetailScreen;