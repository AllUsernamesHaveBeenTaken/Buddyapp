
import React, { PureComponent } from 'react';
import { FlatList, View, Text, StyleSheet, Image } from 'react-native';
import Touchable from "@appandflow/touchable";
import { human, systemWeights } from "react-native-typography";

import FriendInvitationItem from './FriendInvitationItem'

const styles = StyleSheet.create({
  root: {
    maxHeight: 200,
    paddingTop: 5
  }
})

_renderItem = ({item}) => <FriendInvitationItem username={item.firstName + ' ' + item.lastName} avatar={item.avatar} userId={item.id}/>

class FriendInvitationList extends PureComponent {
  state = {  }

  render() {
    //const { user, insertedAt, text} = this.props
    return (
      <View style={styles.root}>
        <FlatList 
          data={this.props.data}          
          keyExtractor={(item, index) => item.id}
          renderItem={_renderItem}
        />
      </View>
    );
  }
}

export default FriendInvitationList;