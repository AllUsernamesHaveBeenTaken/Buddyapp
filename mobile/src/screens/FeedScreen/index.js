import React, { Component } from 'react'
import { FlatList, Text, ActivityIndicator, StyleSheet, View, RefreshControl } from 'react-native';
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import { GigCard, AddGigBtn } from '../../components'
import { FeedGigFragment } from "./fragments";

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

class FeedScreen extends Component {
  state = { 
    isRefreshing: false
   }

  _keyExtractor = (item) => item.id
  
  _renderItem = ({item}) => <GigCard data={item}/>

  _refreshRequest = async () => {
    this.setState({ isRefreshing: true})
    await this.props.data.refetch()
    this.setState({ isRefreshing: false})
  }

  render() {
    console.log(this.props.data)
    if (this.props.data.loading) {
      return (
        <View style={styles.loading} >
          <ActivityIndicator size="large" color='#1B9AAA' />
        </View>
      )
    }
    return (
      <View>
        <FlatList 
          data={this.props.data.gigs}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          refreshControl={
            <RefreshControl 
              refreshing={this.state.isRefreshing}
              onRefresh={this._refreshRequest}
            />
          }
        />
        <AddGigBtn navigator={this.props.navigator}/>
      </View>
    );
  }
}

const getGigs = gql`
  query {
    gigs {
      ...feedGig
    }
  }
  ${FeedGigFragment}
`

export default graphql(getGigs)(FeedScreen);