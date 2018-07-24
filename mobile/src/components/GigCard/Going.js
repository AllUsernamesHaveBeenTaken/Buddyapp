import React from 'react';
import { View, StyleSheet } from 'react-native';
import Touchable from "@appandflow/touchable";
import Ionicons from 'react-native-vector-icons/Ionicons'

import { makeHitSlope } from '../../utils/themes'

const styles = StyleSheet.create({
  root: {
    height: 30,
    backgroundColor: 'white',
    flexDirection: 'row',   
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'                 
  },
  button: {
    color: '#050505'
  }
})

export default function Going({
  isGoing,
  onGoingPress
}){

  _isLiked = () => {
    if (isGoing) {
      return <Ionicons name="md-checkmark" size={25} style={[styles.button, {color: '#00f966'}]} />
    } else { 
      return <Ionicons name="md-checkmark" size={25} style={styles.button}/>
    }
  }

  return (
    <View style={styles.root} >
      <Touchable onPress={onGoingPress} hitSlop={makeHitSlope(20)} feedback="opacity" style={styles.buttonWrapper}>
        {this._isLiked()}
      </Touchable>
    </View>
  )
}