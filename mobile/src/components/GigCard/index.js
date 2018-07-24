import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { graphql, compose } from 'react-apollo'
import { defaultDataIdFromObject } from "apollo-cache-inmemory";
import Touchable from "@appandflow/touchable";

import Header from './Header'
import Description from './Description'
import Actionbar from './Actionbar'

import { likeGigMutation, goingGigMutation } from "../../graphql/mutations";
import { FeedGigFragment } from "../../screens/FeedScreen/fragments";


const styles = StyleSheet.create({
    root: {
        minHeight: 120,
        paddingBottom: 5,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        shadowColor: "#050505",
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: {
        height: 0,
        width: 0
        }
    }
})

class GigCard extends Component {
    state = {  }

    _onLikedPress = async () => this.props.onLikeGigMutation()

    _onGoingPress = async () => this.props.onGoingGigMutation()

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
            <Touchable style={styles.root} feedback='opacity' onPress={this._onGoToDetail}>
                <Header avatar={this.props.data.user.avatar} username={this.props.data.user.firstName + ' ' + this.props.data.user.lastName}/>
                    <Description 
                        title={this.props.data.title}
                        location={this.props.data.location}
                        date={this.props.data.when}
                        onLikedPress={this._onLikedPress}
                        onGoingPress={this._onGoingPress}
                        isFavorited={this.props.data.isFavorited}
                        isGoing={this.props.data.isGoing}
                    />
            </Touchable>
        );
    }
}

export default compose(
    graphql(likeGigMutation, {
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
    }),
    graphql(goingGigMutation, {
        props: ({ mutate, ownProps }) => ({
            onGoingGigMutation: () => mutate({
                variables: {
                    gigId: ownProps.data.id
                }
            }),
            update: (store, {
                data: {
                    goingGig
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
                        isGoing: goingGig
                    }
                })
            }
        })
    })
)(GigCard);