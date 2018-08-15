import React, { Component } from 'react'
import { Navigation, ScreenVisibilityListener } from 'react-native-navigation-v1-v2-adapter';
import { FlatList, Text, ActivityIndicator, StyleSheet, View, RefreshControl, SafeAreaView } from 'react-native';
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import { iconsMap } from '../../utils/themes'
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
  constructor(props) {
    super(props);
    this.state = { 
      isRefreshing: false
     }

    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  _keyExtractor = (item) => item.id
  
  _renderItem = ({item}) => <GigCard navigator={this.props.navigator} data={item}/>

  _refreshRequest = async () => {
    this.setState({ isRefreshing: true})
    await this.props.data.refetch()
    this.setState({ isRefreshing: false})
  }

  navigationButtonPressed({ buttonId }) {
    buttonId === 'profile' && Navigation.push(this.props.componentId, {
      component: {
        name: 'buddy.ProfileScreen',
        options: {
          topBar: {
            rightButtons: [
              {
                title: 'Settings',
                id: 'settings',
                icon: iconsMap.gears
              },
              {
                title: 'Notifications',
                id: 'notifications',
                icon: iconsMap['bell-o']
              }
            ],
          }
        }
      }
    }); 
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
          data={this.props.data.friendsGigs}
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
    friendsGigs {
      ...feedGig
    }
  }
  ${FeedGigFragment}
`

export default graphql(getGigs)(FeedScreen);