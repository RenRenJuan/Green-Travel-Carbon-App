import * as React from 'react';
import { useState } from 'react';
import { Alert, Button, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { ScreenInfo2 } from '../components/ScreenInfo';
import { bgOps, TripDisplay, LastTrip, Trips, setEndIsLast } from '../GT2';
import { RootTabScreenProps } from '../types';
import * as Device from 'expo-device';
import PermissionsButton from '../BGEO';

var debug:number    =  0;

const styles = StyleSheet.create({
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

  if (!bgOps) {
    if (Device.osName === 'iOS')
         Alert.alert("Background location not enabled. Must be in foreground and awake during trip!");
    else Alert.alert('Stay in foreground, awake during trip!');    
  } 

  Trips.start();

}

function pauseTrip() {

  if (!Trips.paused) {
      Trips.pause();
  }
  else    {
      Trips.pause();
  }

}

function endTrip() {  Trips.end(); }

export default function TripScreen( { navigation }: RootTabScreenProps<'Trip'>) {

  const [sButtonText, setSButtonText] = useState("Start"); 
  const [pButtonText, setPButtonText] = useState("Pause");
   
   if (Trips.nTrips < 1)
   return (
    <View style={styles.container}>
    <PermissionsButton />
      <Text style={styles.title}>Trip Control</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />  
      <ScreenInfo2 />
      <View style={styles.controls} >
       <Button
        title={sButtonText}
        onPress={() => {
          if (!Trips.inProgress) {startTrip();
                                  if (Trips.inProgress) { setSButtonText("End"); setPButtonText('Pause');}}
          else                   {setSButtonText('Start'); LastTrip.from(Trips);  endTrip(); navigation.push('Modal'); }}
        }
       />
       <Button
        title={pButtonText}
        onPress={() => { if (!Trips.inProgress) Alert.alert("No trip in progress!"); else {
          if (!Trips.paused) {setPButtonText("Resume");pauseTrip();}
          else {setPButtonText('Pause');pauseTrip();}}}
        }
       />
      </View>
      <TripDisplay></TripDisplay>
    </View>
   );
   else
   return (
    <View style={styles.container}>
    <PermissionsButton />
      <Text style={styles.title}>Trip Control</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />  
      <ScreenInfo2 />
      <View style={styles.controls} >
       <Button
        title={sButtonText}
        onPress={() => {
          if (!Trips.inProgress) {startTrip();
                                  if (Trips.inProgress) { setSButtonText("End"); setPButtonText('Pause');}}
          else                   {setSButtonText('Start'); endTrip(); LastTrip.from(Trips); navigation.push('Modal'); }}
        }
       />
       <Button
        title={pButtonText}
        onPress={() => { if (!Trips.inProgress) Alert.alert("No trip in progress!"); else {
          if (!Trips.paused) {setPButtonText("Resume");pauseTrip();}
          else {setPButtonText('Pause');pauseTrip();}}}
        }
       />
       </View>
      <TripDisplay></TripDisplay>
       <View>
       <Button title={'Show Last Trip'} onPress={() => { setEndIsLast(true); navigation.push('Modal'); } } />
      </View>
    </View>
   );
    

}
