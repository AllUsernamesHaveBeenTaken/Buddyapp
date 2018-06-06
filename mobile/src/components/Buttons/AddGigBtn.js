import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Touchable from '@appandflow/touchable'
import FontAwesome from "react-native-vector-icons/FontAwesome";

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1B9AAA',
    height: 60,
    width: 60,
    borderRadius: 40,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
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
      <View>
        <Touchable feedback="highlight" style={styles.button} onPress={this._onButtonPress}>
            <FontAwesome name='users' size={25} color='#ffffff'/>
        </Touchable>                   
      </View>
    );
  }
}

export default AddGigBtn;
