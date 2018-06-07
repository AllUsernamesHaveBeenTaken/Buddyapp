import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Touchable from "@appandflow/touchable";
import Ionicons from 'react-native-vector-icons/Ionicons'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'
import { human, systemWeights } from "react-native-typography";

import { makeCircle, makeHitSlope } from "../../utils/themes";

const styles = StyleSheet.create({
  root: {
    minHeight: 50,
    flexDirection: 'row'
  },
  avatarWrapper:{
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  contentWrapper:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  heartWrapper:{
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    ...makeCircle(30)
  },
  heart: {
    color: '#050505'
  },
  date: {
    ...systemWeights.thinObject,
    ...human.caption1Object,
    color: '#05050550'    
  },
  dateWrapper:{
    marginTop: 5
  },
  body: {
    ...systemWeights.thinObject,
    ...human.caption1Object,
  },
  userName: {
    ...systemWeights.bold,
  }
})

class Comment extends PureComponent {
  state = {  }
  render() {
    const { user, insertedAt, text} = this.props
    return (
      <View style={styles.root}>
        <View style={styles.avatarWrapper}>
          <Image style={styles.avatar} source={{ uri: user.avatar}}/>
        </View>
        <View style={styles.contentWrapper}>
          <View>
            <Text style={styles.body}>
              <Text style={styles.userName}>{user.firstName} {user.lastName} </Text>
              {text} 
            </Text>
          </View>
          <View style={styles.dateWrapper}>
            <Text style={styles.date}>{distanceInWordsToNow(insertedAt)} ago</Text>
          </View>
        </View>
        <View style={styles.heartWrapper}>
          <Touchable  hitSlop={makeHitSlope(20)} feedback="opacity" style={styles.buttonWrapper}>
            <Ionicons name="md-heart-outline" size={15} style={styles.heart}/>
          </Touchable>
        </View>
      </View>
    );
  }
}

export default Comment;