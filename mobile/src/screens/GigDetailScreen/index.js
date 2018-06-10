import React, { PureComponent, Fragment } from 'react'
import { 
  View,
  Text, 
  StyleSheet,
  ActivityIndicator,
  ScrollView, 
  FlatList, 
  TextInput,
  Image,
  KeyboardAvoidingView,
  SafeAreaView,
  Keyboard,
  Dimensions,
  Animated
} from 'react-native';
import { Query, graphql } from "react-apollo";
import gql from "graphql-tag";

import { Comment } from "../../components";
import { fakeAvatar } from "../../utils/constants";
import { makeCircle } from "../../utils/themes";
import { createCommentMutation } from "../../graphql/mutations";

const INPUT_HEIGHT = 60

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputSection: {
    height: INPUT_HEIGHT,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#ffffff'
  },
  avatar: {
    ...makeCircle(40)
  },
  inputWrapper: {
    width: '85%',
    height: '70%',
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#1B9AAA',
    paddingHorizontal: 15
  },
  input: {
    flex: 1
  },
  avoidingView: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,    
  },
  contentList: {
    paddingBottom: INPUT_HEIGHT
  }
})

const GET_COMMENTS = gql`
  query Comments($gigId: ID!) {
    comments(gigId: $gigId){
      id
      text
      insertedAt
      user {
        id 
        avatar
        firstName
        lastName
      }
    }
  }
`

class GigDetailScreen extends PureComponent {
  constructor(props){
    super(props)
    this.state = { 
      comment: '',
      screenHeight: Dimensions.get('window').height,
      flatListHeight: new Animated.Value(Dimensions.get('window').height)
    }
    props.navigator.setOnNavigatorEvent(this._onBackButtonPress.bind(this))
  }

  componentDidMount = () => {
    this._keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidHide
    )
    this._keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    )
  }

  componentWillUnmount = () => {
    this._keyboardDidShowListener.remove()
    this._keyboardDidHideListener.remove()
  }

  _onBackButtonPress = (e) => {
    if (e.id === 'willDisappear'){
      navigatorStyle = {
        tabBarHidden: false
      };
    }
  }

  _keyExtractor = (item) => item.id

  _renderItem = ({item}) => <Comment {...item} />;

  _handleChange = comment => this.setState({ comment });

  _onSubmit = () => {
    this.props.onCreateComment(this.state.comment)
    this.setState({ comment: '' })
  }
  
  _keyboardDidShow = (e) => {
    Animated.timing(this.state.flatListHeight, {
      toValue: Dimensions.get('window').height - e.endCoordinates.height,
      duration: 200
    }).start()
  }

  _keyboardDidHide = () => {
    Animated.timing(this.state.flatListHeight, {
      toValue: Dimensions.get('window').height,
      duration: 200
    }).start()
  }
  

  render() {
    return (
      <Fragment>
        <Query query={GET_COMMENTS} variables={{gigId: this.props.gigId}}>
          {({ loading, error, data}) => {
            console.log(data)
            if(loading) {
              return (
                <View style={styles.root}>
                  <ActivityIndicator size='large' />
                </View>
              )
            }
            return (
              <KeyboardAvoidingView behavior='padding' enabled keyboardVerticalOffset={INPUT_HEIGHT + 30}>
                <AnimatedFlatList 
                style={{height: this.state.flatListHeight}}
                data={data.comments}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                contentContainerStyle={styles.contentList}
                />
              </KeyboardAvoidingView>
            )
          }}
        </Query>
        <KeyboardAvoidingView behavior='padding' enabled style={styles.avoidingView} keyboardVerticalOffset={INPUT_HEIGHT + 30}>
          <View style={styles.inputSection}>
              <Image source={{uri: fakeAvatar}} style={styles.avatar}/>
              <View style={styles.inputWrapper}>
                <TextInput 
                  style={styles.input}
                  placeholder='Add a comment ...'
                  returnKeyType='send'
                  value={this.state.comment}
                  onChangeText={this._handleChange}
                  onSubmitEditing={this._onSubmit}
                />
              </View>
            </View>
        </KeyboardAvoidingView>
      </Fragment>
    );
  }
}

export default graphql(createCommentMutation, {
  props: ({ mutate, ownProps }) => ({
    onCreateComment: text =>
    mutate({
      variables: {
        text,
        gigId: ownProps.gigId
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createComment: {
          id: Math.round(Math.random() * -1000000),
          __typename: 'Comment',
          insertedAt: new Date(),
          text,
          user: {
            __typename: 'User',
            id: 'User:6',
            firstName: 'Seppe',
            lastName: 'Snoeck',
            avatar: fakeAvatar
          }
        }
      },
      update: (store, {data: {createComment}}) => {
        const data = store.readQuery({
          query: GET_COMMENTS,
          variables: {
            gigId: ownProps.gigId
          }
        })
        store.writeQuery({
          query: GET_COMMENTS,
          variables: { gigId: ownProps.gigId},
          data: {
            comments: [ createComment, ...data.comments]
          }
        })
      }
    })
  })
})(GigDetailScreen);