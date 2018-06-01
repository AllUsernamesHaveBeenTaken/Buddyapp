import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Touchable from '@appandflow/touchable'
import Entypo from 'react-native-vector-icons/Entypo'
import { human, systemWeights } from "react-native-typography";

import { makeCircle, makeHitSlope } from '../../utils/themes'
import { fakeAvatar } from '../../utils/constants'

const styles = StyleSheet.create({
  root: {
    height: 50,
    flexDirection: 'row',
    paddingHorizontal: 10,
    backgroundColor: 'white'
  },
  userMetaWrapper: {
    flex: 1,
    flexDirection: 'row'        
  },
  btnWrapper: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  AvatarWrapper: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  AvatarImg: {
    ...makeCircle(45),
  },
  userInfoWrapper: {
    justifyContent: 'center',
    flex: 1,
    padding: 10,
  },
  username: 
    {
      ...human.calloutObject,
      ...systemWeights.bold,
      color: '#050505'
    }
  
});

export default function Header({
  avatar = fakeAvatar,
  username = 'Seppe Snoeck'
}) {
  return (
    <View style={styles.root}>
      <View style={styles.userMetaWrapper}>
        <View style={styles.AvatarWrapper}>
          <Image source={{ uri: avatar}} style={styles.AvatarImg} />
        </View>  
        <View style={styles.userInfoWrapper}>
            <Text style={styles.username} >{username}</Text>
          </View>
      </View>
      <Touchable hitSlop={makeHitSlope(20)} feedback="opacity" style={styles.btnWrapper}>
        <Entypo name="dots-three-horizontal" size={25} style={{color: '#050505'}}/>
      </Touchable>
    </View>
  );
}
