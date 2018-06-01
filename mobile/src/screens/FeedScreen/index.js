import React, { Component } from 'react'
import { FlatList, Text, ActivityIndicator, StyleSheet, View, RefreshControl } from 'react-native';
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import { GigCard } from '../../components'

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
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <FlatList 
        data={this.props.data.gigs}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        refreshControl={
        <RefreshControl 
          refreshing={this.state.isRefreshing}
          onRefresh={this._refreshRequest}/>
        }
      />
    );
  }
}

const getGigs = gql`
  query {
    gigs {
      id
      title
      location
      when
    }
  }
`

export default graphql(getGigs)(FeedScreen);