import React, { Component } from 'react'
import { View, Text, StyleSheet, StatusBar, TextInput, AsyncStorage, ActivityIndicator } from 'react-native';
import LinearGradient from "react-native-linear-gradient";
import Touchable from "@appandflow/touchable";
import { human, systemWeights } from "react-native-typography";
import Entypo from "react-native-vector-icons/Entypo";
import { LoginManager, AccessToken } from "react-native-fbsdk";
import gql from 'graphql-tag'
import { graphql } from "react-apollo";

import { fonts } from "../../utils/themes";
import { AsyncStorageAuthToken } from "../../utils/constants";
import { startMainApp } from "../../Nav";

const COLORS_GRADIENT = ['#1B9AAA', '#FFFFFF']

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flex: 0.3,
    backgroundColor:'#1B9AAA',
    alignSelf : 'stretch',
    justifyContent: 'center',
    alignItems: 'center'
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignSelf : 'stretch' 
  },
  headerContent: {
    color: '#FFFFFF',
    fontSize: 70,
    fontFamily: fonts.pacifico
  },
  section: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  sectionBottom: {
    justifyContent: 'flex-start',
    flex: 0.6
  },
  inputWrapper: {
    height: 45,
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#1B9AAA60',
    marginBottom: 10,
    padding: 10
  },
  input: {
    flex: 1,
    padding: 0
  },
  loginBtn: {
    height: 45,
    width: '90%',
    backgroundColor: '#1B9AAA80',
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    ...human.bodyObject,    
    color: '#FFFFFF'
  },
  forgotWrapper: {
    marginVertical: 10,
    flexDirection: 'row'
  },
  forgotBtn: {
    ...human.footnoteObject,
    ...systemWeights.semibold,        
    color: '#1B9AAA'
  },
  callout: {
    ...human.footnoteObject,
    ...systemWeights.semibold,        
    color: '#50505070'
  },
  orWrapper: {
    width: '90%',
    marginVertical: 10,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  orDivider: {
    height: 1,
    width: '100%',
    flex: 1,
    backgroundColor: '#50505010'
  },
  orTextWrapper: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  orText: {
    ...human.footnoteObject,
    ...systemWeights.semibold,            
    color: '#50505050'
  },
  facebookLoginBtn: {
   flexDirection: 'row',
   height: 50,
   alignItems: 'center' 
  },
  facebookLoginBtnText: {
    ...human.calloutObject,
    ...systemWeights.semibold, 
    color: '#318DEB',
    marginLeft: 10
  },
  noAccountWrapper: {
    height: 50,
    width: '100%',
    borderColor: '#ECECEC',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
   flexDirection: 'row',    
  }
})

class LoginScreen extends Component {
  state = { 
    loading: false
   }

  _onFacebookLoginPress = async () => {
    this.setState({ loading: true })
    const res = await LoginManager.logInWithReadPermissions(['public_profile', 'email'])
    
    if (res.grantedPermissions && !res.isCancelled) {
      const data = await AccessToken.getCurrentAccessToken();

      if (data) {
        const serverResponse = await this.props.loginMutation({
          variables: {
            provider: 'FACEBOOK',
            token: data.accessToken
          }
        })

        const { token } = serverResponse.data.login

        try {
          await AsyncStorage.setItem(AsyncStorageAuthToken, token)
          this.setState({ loading: false })
          startMainApp();
        } catch (error) {
          throw error;
        }

      }
    }
  }

  render() {
   
    if (this.state.loading) {
      return (
        <View style={styles.root}>
          <ActivityIndicator size='large' color='#1B9AAA'/>
        </View>
      )
    }
    
   return (
      <View style={styles.root}>
        <StatusBar barStyle='light-content'/>
        <LinearGradient colors={COLORS_GRADIENT} style={styles.header}>
          <Text style={styles.headerContent}>Buddy</Text>
        </LinearGradient>
        <View style={styles.content}>
          <View style={styles.section}>
            <View style={styles.inputWrapper}>
              <TextInput undelineColorAndroid='transparent' style={styles.input} placeholder='Email'/>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput undelineColorAndroid='transparent'  style={styles.input} placeholder='Password'/>
            </View>
            <Touchable style={styles.loginBtn} feedback='opacity'>
              <Text style={styles.loginBtnText} >Login</Text>
            </Touchable>
            <View style={styles.forgotWrapper}>
              <Text style={styles.callout}>Forgot your login details? </Text>
              <Touchable feedback='opacity'>
                <Text style={styles.forgotBtn}>Get help signing in.</Text>
              </Touchable>
            </View>
          </View>
          <View style={styles.orWrapper}>
            <View style={styles.orDivider}></View>
            <View style={styles.orTextWrapper}>
              <Text style={styles.orText}>OR</Text>
            </View>
            <View style={styles.orDivider}></View>
          </View>
          <View style={[styles.section, styles.sectionBottom]}>
            <Touchable onPress={this._onFacebookLoginPress} style={styles.facebookLoginBtn} feedback='opacity'>
              <Entypo size={30} name='facebook' color='#318DEB'/>
              <Text style={styles.facebookLoginBtnText} >Continue with Facebook</Text>
            </Touchable>
          </View>
          <View style={styles.noAccountWrapper}>
            <Text style={styles.callout} >Don't have an account? </Text>
            <Touchable feedback='opacity'>
              <Text style={styles.forgotBtn}>Sign up!</Text>
            </Touchable>
          </View>
        </View>
      </View>
    );
  }
}

const loginMutation = gql`
  mutation($provider: Provider, $token: String){
    login(provider: $provider, token: $token){
      token
    }
  }
`

export default graphql(loginMutation, { name: 'loginMutation' })(LoginScreen);