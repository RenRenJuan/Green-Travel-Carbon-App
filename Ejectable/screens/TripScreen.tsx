import * as React from 'react';
import { useState } from 'react';
import { Alert, BackHandler, Button, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { ScreenInfo2 } from '../components/ScreenInfo';
import  EndScreenInfo  from '../components/EndScreenInfo';
import { locEnabled, getEndPending, toggleEndPending, TripDisplay, Trips } from '../GT2';

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

  if (!locEnabled ) {
    Alert.alert("You must enable both foreground\n and background location tracking.");
    return;
  }

  Trips.start();

}

function pauseTrip() {

  if (!Trips.paused) {
      Alert.alert('Trip Paused');
      Trips.pause();
  }
  else    {
      Alert.alert('Trip Resumed');
      Trips.pause();
  }

}

function endTrip() {  Trips.end(); }

export default function TripScreen( ) {

  const [sButtonText, setSButtonText] = useState("Start"); 
  const [pButtonText, setPButtonText] = useState("Pause");
  
  if (!getEndPending()) 
   return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Control</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />  
      <ScreenInfo2 />
      <View style={styles.controls} >
       <Button
        title={sButtonText}
        onPress={() => {
          if (!Trips.inProgress) {setSButtonText("End");startTrip();setPButtonText('Pause');}
          else                   {setSButtonText('Start');endTrip();}}
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
       <Text style={styles.title}>Trip Control</Text>
       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />  
       <EndScreenInfo path="/screens/TripScreen.tsx" />
       <Button title={'Dismiss'}
        onPress={() => { toggleEndPending();  }}
      />
     </View>
    );
  

}
