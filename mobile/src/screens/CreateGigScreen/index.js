import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TextInput} from 'react-native';
import Touchable from "@appandflow/touchable";
import { human, systemWeights } from "react-native-typography";

import { iconsMap } from '../../utils/themes'

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
  inputTimeWrapper: {
    height: 45,
    width: '95%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1B9AAA60',
    marginBottom: 10,
    padding: 10,
    flexDirection: 'row'
  },
  inputTime: { 
    flex: 1,
  },
  inputPlans: {
    height: 100
  },
  sectionBtn: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 10,
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
})

class CreateGigScreen extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {  }
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
    return (
      <View style={styles.root} >
        <View style={styles.inputSection}>
          <View style={[styles.inputWrapper, styles.inputPlans]}>
            <TextInput multiline undelineColorAndroid='transparent' style={styles.input} placeholder='What are your plans?'/>
          </View>
          <View style={styles.inputWrapper}>
            <TextInput undelineColorAndroid='transparent' style={styles.input} placeholder='Location'/>
          </View>
          <View style={styles.inputTimeWrapper}>
            <View style={styles.inputTime}>
              <TextInput undelineColorAndroid='transparent' style={styles.input} placeholder='From'/>
            </View>
            <View style={styles.inputTime}>
              <TextInput undelineColorAndroid='transparent' style={styles.input} placeholder='To'/>
            </View>
          </View>
        </View>
        <View style={styles.sectionBtn} >
          <Touchable onPress={this._onCancelPress} style={styles.btnCancel} feedback='opacity'>
            <Text style={styles.cancelBtnText} >Cancel</Text>
          </Touchable>
          <Touchable style={styles.btnSubmit} feedback='opacity'>
            <Text style={styles.submitBtnText} >Submit</Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

export default CreateGigScreen;