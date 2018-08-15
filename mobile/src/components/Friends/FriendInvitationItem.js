
import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Touchable from "@appandflow/touchable";
import { human, systemWeights } from "react-native-typography";

import { makeCircle, makeHitSlope } from '../../utils/themes'
import { fakeAvatar } from '../../utils/constants'

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    minHeight: 20,
    marginBottom: 5
  },
  avatar: {
    flex: 0.2,
  },
  data: {
    flex: 1,
    justifyContent: 'center'
  },
  inviteBtnWrapper: {
    flex: 0.4,
  },
  AvatarImg: {
    ...makeCircle(35),
  },
  username: 
  {
    ...human.calloutObject,
    ...systemWeights.regular,
    color: '#050505'
  },
  btnInvite: {
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1B9AAA60',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  inviteBtnText: {
    ...human.footnoteObject,    
  },
  btnInvited: {
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1B9AAA60',
    backgroundColor: '#1B9AAA',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  invitedBtnText: {
    ...human.footnoteObject,   
    color: '#ffffff' 
  }
})

class FriendInvitationList extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isInvited: false
    }
  }
  
  _onInvitePress = () => {
    this.props.addInvitee(this.props.userId)    
    this.setState({isInvited: true})
  }

  _onInvitedPress = () => {
    this.props.removeInvitee(this.props.userId)    
    this.setState({isInvited: false})
  }

  isInvitedBtn = () => {
    if (!this.state.isInvited) {
      return (
        <Touchable onPress={this._onInvitePress} style={styles.btnInvite} feedback='opacity'>
          <Text style={styles.inviteBtnText}>Invite</Text>
        </Touchable>
        )
    } else {
      return (
        <Touchable onPress={this._onInvitedPress} style={styles.btnInvited} feedback='opacity'>
          <Text style={styles.invitedBtnText}>Invited</Text>
        </Touchable>
      ) 
    }
  }

  render() {
    return (
      <View style={styles.root}>
      <View style={styles.avatar}>
          <Image source={{ uri: this.props.avatar}} style={styles.AvatarImg} />
        </View>
        <View style={styles.data}>
          <Text style={styles.username}>{this.props.username}</Text>
        </View>
        <View style={styles.inviteBtnWrapper}>
          {this.isInvitedBtn()}
        </View>
      </View>
    );
  }
}

export default FriendInvitationList
