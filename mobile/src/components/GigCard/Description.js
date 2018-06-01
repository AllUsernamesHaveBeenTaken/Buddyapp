import React from 'react'
import { View, Text, StyleSheet } from 'react-native';
import { human, systemWeights } from "react-native-typography";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Moment from "moment";

import Heart from "./Heart";

const styles = StyleSheet.create({
  root: {
    minHeight: 70,
    backgroundColor: 'white',
    flexDirection: 'row',  
    paddingBottom: 10     
  },
  contentRight: {
    flex: 1,
    paddingHorizontal: 10,   
  },
  contentLeft: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    ...human.headlineObject,
    ...systemWeights.semibold,
    color: '#050505'        
  },
  time: {
    ...human.calloutObject,
    ...systemWeights.regular ,
    color: '#050505'       
  },
  location: {
    ...human.subheadObject,
    ...systemWeights.light,
    flex: 0.9, 
    paddingTop: 1   
  },
  locationWrapper: {
    flex: 1,
    flexDirection: 'row'       
  },
  locationIcon: {
    flex: 0.1,
    color:'#28E6FF',
  },
  date: {
    ...human.headlineObject,
    color: '#28E6FF',    
  },
  heart: {
    flex: 0.2,
    justifyContent: 'center',
  }
})

export default function Description({
  time = '1:00 - 3:00',
  title = 'Zuipen in voor mijn verjaardag',
  location = 'Saga, Deinze',
  date = new Date('01/01/2018')
}){
  return (
    <View style={styles.root}>
      <View style={styles.contentLeft}>
      <Text style={styles.date}>{Moment(date).format('D')}</Text>        
      <Text style={styles.date}>{Moment(date).format('MMM')}</Text>        
      </View>
      <View style={styles.contentRight}>
        <Text style={styles.time}>{time}</Text>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.locationWrapper}>
          <SimpleLineIcons style={styles.locationIcon} name="location-pin" size={20}/>        
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>
      <View style={styles.heart}>
        <Heart />  
      </View>                  
    </View>
  )
}