import * as React from 'react';
import { Button, StyleSheet, Alert } from 'react-native';
import { Text, View } from '../components/Themed';
import { ScreenInfo2 } from '../components/ScreenInfo';
import { ThisTrip } from '../GT2';

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

  ThisTrip.start();
  Alert.alert('Trip Started');

}

function pauseTrip() {

  ThisTrip.pause();
  Alert.alert('Trip Paused');

}

function endTrip() {

  ThisTrip.end();
  Alert.alert('Trip Ended');

}

export default function TripScreen() {
  
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
      < ThisTrip.tripDisplay />
    </View>
  );

}
