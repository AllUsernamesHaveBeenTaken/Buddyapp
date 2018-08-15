import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TextInput, ActivityIndicator} from 'react-native';
import Touchable from "@appandflow/touchable";
import { human, systemWeights } from "react-native-typography";
import { compose, graphql } from "react-apollo";
import gql from "graphql-tag";
import DateTimePicker from 'react-native-modal-datetime-picker';

import { iconsMap } from '../../utils/themes'
import { createGigMutation } from "../../graphql/mutations";
import { FeedGigFragment, FeedFriendsFragment } from "../../screens/FeedScreen/fragments";
import { FriendInvitationList } from "../../components/Friends";

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  inputSection:{
    flex: 0.5,
    margin: 10,
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  inputWrapper: {
    height: 45,
    width: '95%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1B9AAA60',
    marginBottom: 10,
    padding: 10,
  },
  input: {
    flex: 1,
  },
  inputPlans: {
    height: 100
  },
  sectionBtn: {
    flex: 1,
    flexDirection: 'row',
  },
  btnSubmit: {
    height: 20,
    width: '45%',
    backgroundColor: '#1B9AAA95',
    borderRadius: 5,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  btnCancel: {
    height: 20,
    width: '45%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1B9AAA60',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  submitBtnText: {
    ...human.footnoteObject,
    ...systemWeights.bold,
    color: '#FFFFFF'
  },
  cancelBtnText: {
    ...human.footnoteObject,    
  },
  loadingWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  friendsWrapper: {
    width: '95%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1B9AAA60',
    paddingRight: 10,
    paddingLeft: 10,
    marginBottom: 10
  }
})

class CreateGigScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { 
      title: '',
      location: '',
      when: '',
      year: '',
      month: '',
      day: '',
      hours: '',
      minutes: '',
      loading: false,
      isDateTimePickerVisible: false
    }
    props.navigator.setOnNavigatorEvent(this._onBackButtonPress.bind(this))
  }

  _onBackButtonPress(e) {
    if (e.type === 'NavBarButtonPress') {
      if (e.id === 'goBackFromCreateNewGig') {
        this.props.navigator.dismissModal({
          animationType: 'none'
        })
      }
    }
  }

  _onCancelPress = () => {
    this.props.navigator.dismissModal({
      animationType: 'none'
    })
  }

  _onSubmitPress = async () => {
    this.setState({ loading: true })

    await this.props.onCreateGig({
      title: this.state.title,
      location: this.state.location,
      when: this.state.when,
    })
    
    this.props.navigator.dismissModal({
      animationType: 'none'
    })
    this.setState({ loading: false })
  }

  _onTitleChange = title => this.setState({title})

  _onLocationChange = location => this.setState({location})

  _onWhenChange = when => this.setState({
    when: when.toISOString(),
    year: when.getFullYear(),
    month: when.getMonth() + 1,
    day: when.getDate(),
    hours: when.getHours(),
    minutes: when.getMinutes()
  })

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this._onWhenChange(date)
    this._hideDateTimePicker();
  }

  componentWillMount() {
    this.props.navigator.setButtons({
      leftButtons: [
        {
          id: 'goBackFromCreateNewGig',
          icon: iconsMap.cross,
          color: '#1B9AAA'
        }
      ]
    })
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.loadingWrapper} >
          <ActivityIndicator size='large'/>
        </View>
      )
    }
    return (
      <View style={styles.root} >
        <View style={styles.inputSection}>
          <View style={[styles.inputWrapper, styles.inputPlans]}>
            <TextInput 
              value={this.state.title}
              multiline 
              undelineColorAndroid='transparent' 
              style={styles.input}
              placeholder='What are your plans?'
              onChangeText={this._onTitleChange}
            />
          </View>
          <View style={styles.inputWrapper}>
            <TextInput 
              value={this.state.location} 
              undelineColorAndroid='transparent' 
              style={styles.input} 
              placeholder='Location?'
              onChangeText={this._onLocationChange}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Touchable onPress={this._showDateTimePicker} feedback='opacity' >
              <Text style={styles.cancelBtnText}>{this.state.when ? this.state.year +'-' + this.state.month + '-' + this.state.day + ' ' + this.state.hours + ':' + this.state.minutes: 'When?'}</Text>
            </Touchable>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
              mode={'datetime'}
              is24Hour={true}
            />
          </View>
          <View style={styles.friendsWrapper} >
            <FriendInvitationList data={this.props.data.getFriends}/>          
          </View> 
          <View style={styles.sectionBtn} >
            <Touchable onPress={this._onCancelPress} style={styles.btnCancel} feedback='opacity'>
              <Text style={styles.cancelBtnText} >Cancel</Text>
            </Touchable>
            <Touchable onPress={this._onSubmitPress} style={styles.btnSubmit} feedback='opacity'>
              <Text style={styles.submitBtnText} >Submit</Text>
            </Touchable>
          </View>
        </View>
        
      </View>
    );
  }
}

const getGigs = gql`
  query {
    friendsGigs {
      ...feedGig
    }
  }
  ${FeedGigFragment}
`

const friends = gql`
  query {
    getFriends{
      firstName,
      lastName,
      id,
      avatar
    }
  }
`

export default compose(
  graphql(friends),
  graphql(createGigMutation, {
    props: ({mutate}) => ({
      onCreateGig: variables =>
        mutate({
          variables,
          update: (store, {data: { createGig }}) => {
            const query = store.readQuery({ query: getGigs})
            store.writeData({
              query: getGigs,
              data: {
                friendsGigs: [createGig, ...query.friendsGigs]
              }
            })
          }
        })
    })
  })
)(CreateGigScreen);