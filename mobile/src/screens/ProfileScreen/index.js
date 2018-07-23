import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native';
import { Navigation, ScreenVisibilityListener } from 'react-native-navigation-v1-v2-adapter';
import ActionSheet from 'react-native-actionsheet'

import { AsyncStorageAuthToken } from "../../utils/constants";
import { init } from '../../Nav'

class ProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isRefreshing: false
     }

    Navigation.events().bindComponent(this); // <== Will be automatically unregistered when unmounted
  }

  navigationButtonPressed({ buttonId }) {
    buttonId === 'settings' && this.ActionSheet.show()
  }

  _handleActionSheetPresses = (index) => {
    index === 0 && this._logout()
  }

  _logout = async () => {
      try {
        await AsyncStorage.removeItem(AsyncStorageAuthToken)
        init()
      } catch (error) {
          throw error
      }
  }

  render() {
    return (
      <View>
        <Text>ProfileScreen</Text>
        <ActionSheet
          ref={o => this.ActionSheet = o}
          title={'Settings'}
          options={['Logout', 'Cancel']}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={index => this._handleActionSheetPresses(index)}
        />
      </View>
    );
  }
}

export default ProfileScreen;