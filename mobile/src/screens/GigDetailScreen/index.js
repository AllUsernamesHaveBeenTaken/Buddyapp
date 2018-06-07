import React, { PureComponent } from 'react'
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { Query } from "react-apollo";
import gql from "graphql-tag";

import { Comment } from "../../components";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
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
        lastName
      }
    }
  }
`

class GigDetailScreen extends PureComponent {
  state = {  }

  _keyExtractor = (item) => item.id

  _renderItem = ({item}) => <Comment {...item} />

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
              <FlatList data={data.comments}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
            </ScrollView>
          )
        }}
      </Query>
    );
  }
}

export default GigDetailScreen;