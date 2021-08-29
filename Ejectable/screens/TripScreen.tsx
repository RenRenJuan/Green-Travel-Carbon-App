import * as React from 'react';
import { useState } from 'react';
import { Alert, BackHandler, Button, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { ScreenInfo2 } from '../components/ScreenInfo';
import { ver, locEnabled, TripDisplay, LastTrip, Trips, setEndIsLast } from '../GT2';
import { RootTabScreenProps } from '../types';
import { getAdvised, setAdvised } from './ModalScreen';

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

  if (!locEnabled) {
    Alert.alert("Location services unavailable can't start trip.");
    return;
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
      <Text style={styles.title}>Trip Control</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />  
      <ScreenInfo2 />
      <View style={styles.controls} >
       <Button
        title={sButtonText}
        onPress={() => {
          if (!getAdvised()) {
            Alert.alert("Note: " + ver + " doesn't run while in background or sleeping.");
            setAdvised();
          }
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
      <Text style={styles.title}>Trip Control</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />  
      <ScreenInfo2 />
      <View style={styles.controls} >
       <Button
        title={sButtonText}
        onPress={() => {
          if (!getAdvised()) {
            Alert.alert("Note: GT2" + ver + " doesn't run while in background or sleeping.");
            setAdvised();
          }
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
