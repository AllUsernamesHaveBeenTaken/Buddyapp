import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Header from './Header'
import Description from './Description'
import Actionbar from './Actionbar'

const styles = StyleSheet.create({
    root: {
        minHeight: 120,
        backgroundColor: '#DDDBCB',
        paddingBottom: 2,
    }
})

class GigCard extends Component {
    state = {  }
    render() {
        return (
            <View style={styles.root}>
                <Header />
                <Description 
                    title={this.props.data.title}
                    location={this.props.data.location}
                    date={this.props.data.when}
                />
            </View>
        );
    }
}

export default GigCard;