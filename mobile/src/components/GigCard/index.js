import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo'
import { defaultDataIdFromObject } from "apollo-cache-inmemory";
import Touchable from "@appandflow/touchable";

import Header from './Header'
import Description from './Description'
import Actionbar from './Actionbar'

import { likeGigMutation } from "../../graphql/mutations";
import { FeedGigFragment } from "../../screens/FeedScreen/fragments";


const styles = StyleSheet.create({
    root: {
        minHeight: 120,
        backgroundColor: '#DDDBCB',
        paddingBottom: 2,
    }
})

class GigCard extends Component {
    state = {  }

    _onLikedPress = async () => {
        this.props.onLikeGigMutation()
    }

    _onGoToDetail = () => {
        this.props.navigator.push({
            screen: 'buddy.GigDetailScreen',
            title: 'Comments',
            passProps: {
                gigId: this.props.data.id
            },
            navigatorStyle: {
                tabBarHidden: true
            },
        })
    }

    render() {
        return (
            <View style={styles.root}>
                <Header avatar={this.props.data.user.avatar} username={this.props.data.user.firstName + ' ' + this.props.data.user.lastName}/>
                <Touchable feedback='highlight' onPress={this._onGoToDetail}>
                    <Description 
                        title={this.props.data.title}
                        location={this.props.data.location}
                        date={this.props.data.when}
                        onLikedPress={this._onLikedPress}
                        isFavorited={this.props.data.isFavorited}
                    />
                </Touchable>
            </View>
        );
    }
}

export default graphql(likeGigMutation, {
    props: ({ mutate, ownProps }) => ({
        onLikeGigMutation: () => mutate({
            variables: {
                gigId: ownProps.data.id
            },
            update: (store, {
                data: {
                    likeGig
                }
            }) => {
                const id = defaultDataIdFromObject({
                    __typename: 'Gig',
                    id: ownProps.data.id
                })

                const gig = store.readFragment({
                    id,
                    fragment: FeedGigFragment
                })

                store.writeFragment({
                    id,
                    fragment: FeedGigFragment,
                    data: {
                        ...gig,
                        isFavorited: likeGig
                    }
                })
            }
        })
    })
})(GigCard);