import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Touchable from '@appandflow/touchable'
import FontAwesome from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 15,
    right: 15,
  },
  shadow: {
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: {
      height: 0,
      width: 0
    }
  }
});

class AddGigBtn extends Component {
  state = {  }
    
    _onButtonPress = () => {
      this.props.navigator.showModal({
        screen: 'buddy.CreateGigScreen',
        title: 'What are your plans?',
        animationType: 'none'
      })
    }

  render() {
    return (
      <View style={styles.shadow}>
        <Touchable feedback="highlight" style={styles.button} onPress={this._onButtonPress}>
            <FontAwesome name='users' size={25} color='#1B9AAA'/>
        </Touchable>                   
      </View>
    );
  }
}

export default AddGigBtn;
