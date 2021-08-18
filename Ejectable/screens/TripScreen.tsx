import * as React from 'react';
import { Component } from 'react';
import { Button, StyleSheet, Alert } from 'react-native';
import { Text, View } from '../components/Themed';
import { ScreenInfo2 } from '../components/ScreenInfo';
import { geocodeAsync } from 'expo-location';
import * as GT2 from '../App';
import * as Nav from '../navigation/BottomTabNavigator';
import Navigation from '../navigation';

var elapsed:number, lat:number, long:number, ds:number, v:number;

const styles = StyleSheet.create({
  tripText: {
   marginHorizontal: -100,
   marginVertical: 60,
   textAlign: 'left',
   width: "80%",
   fontSize: 12,
   fontWeight: 'bold',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    width: "80%",
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
});


function startTrip() {

  GT2.toggleTripInProgress();

  elapsed = 0.0;
  lat     = 0.0;
  long    = 0.0;
  ds      = 0.0;
  v       = 0.0;
  
  Alert.alert('Trip Started');
  

}

function pauseTrip() {
  Alert.alert('Trip Paused');

}

function endTrip() {

  GT2.toggleTripInProgress();
  Alert.alert('Trip Ended');

}

export default function TripScreen() {
  if (!GT2.tripInProgress)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Control</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />  
      <ScreenInfo2 />
      <View style={styles.controls} >
       <Button
        title="Start"
        onPress={() => startTrip() }
       />
       <Button
        title="Pause"
        onPress={() => pauseTrip()}
       />  
       <Button
        title="Stop"
        onPress={() => endTrip() }
       />    
      </View>
    </View>
  ); else
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Control</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />  
      <ScreenInfo2 />
      <View style={styles.controls} >
       <Button
        title="Start"
        onPress={() => startTrip() }
       />
       <Button
        title="Pause"
        onPress={() => pauseTrip()}
       />  
       <Button
        title="Stop"
        onPress={() => endTrip() }
       />    
      </View>
      <View>
        <Text style={styles.tripText}>
          {'Elapsed:    '}{elapsed}{'\n'}
          {'Geo:        '}{lat}{long}{'\n'}
          {'Vector:     '}{ds}{v}{'\n'}
        </Text>
      </View>
    </View>
  );

}
