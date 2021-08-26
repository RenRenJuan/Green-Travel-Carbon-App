import * as React from 'react';
import { useState } from 'react';
import { Alert, BackHandler, Button, StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import { ScreenInfo2 } from '../components/ScreenInfo';
import { locEnabled, TripDisplay, Trips } from '../GT2';
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
            Alert.alert("2.0.0 foreground only, 2.1 first production.");
            setAdvised();
          }
          if (!Trips.inProgress) {startTrip();
                                  if (Trips.inProgress) { setSButtonText("End"); setPButtonText('Pause');}}
          else                   {setSButtonText('Start'); endTrip(); navigation.push('Modal'); }}
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
    

}
