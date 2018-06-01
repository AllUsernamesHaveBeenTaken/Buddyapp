import React from 'react';
import { View, StyleSheet } from 'react-native';
import Touchable from "@appandflow/touchable";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'

import { makeHitSlope } from '../../utils/themes'

const styles = StyleSheet.create({
  root: {
    height: 30,
    backgroundColor: 'white',
    flexDirection: 'row',   
  },
  buttonBarWrapper: {
    flex: 0.86,
    paddingHorizontal: 10,
    marginLeft: 'auto', 
    flexDirection: 'row',                
  },
  buttonWrapper: {
    flex: 0.33,                
  },
  button: {
    color: '#050505'
  }
})

export default function Actionbar(){
  return (
    <View style={styles.root} >
      <View style={styles.buttonBarWrapper}>
        <Touchable hitSlop={makeHitSlope(20)} feedback="opacity" style={styles.buttonWrapper}>
          <Ionicons name="md-heart-outline" size={25} style={styles.button}/>
        </Touchable>
        <Touchable hitSlop={makeHitSlope(20)} feedback="opacity" style={styles.buttonWrapper}>
          <Entypo name="check" size={25} style={styles.button}/>
        </Touchable>
        <Touchable hitSlop={makeHitSlope(20)} feedback="opacity" style={styles.buttonWrapper}>
          <Entypo name="cross" size={25} style={styles.button}/>
        </Touchable>
      </View>
    </View>
  )
}