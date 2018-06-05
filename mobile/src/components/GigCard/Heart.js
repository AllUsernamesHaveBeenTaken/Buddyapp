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

export default function Heart({
  onLikedPress,
  isFavorited
}){

  _isLiked = () => {
    if (isFavorited) {
      return <Ionicons name="md-heart" size={25} style={[styles.button, {color: '#F90093'}]} />
    } else { 
      return <Ionicons name="md-heart-outline" size={25} style={styles.button}/>
    }
  }

  return (
    <View style={styles.root} >
      <Touchable onPress={onLikedPress} hitSlop={makeHitSlope(20)} feedback="opacity" style={styles.buttonWrapper}>
        {this._isLiked()}
      </Touchable>
    </View>
  )
}