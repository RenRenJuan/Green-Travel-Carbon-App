import * as React from 'react';
import { Button, StyleSheet, Alert } from 'react-native';
import { Text, View } from '../components/Themed';
import { ScreenInfo2 } from '../components/ScreenInfo';
import { thisTrip } from '../GT2';
import { TripStack } from '../navigation/BottomTabNavigator';

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

  thisTrip.start();
  Alert.alert('Trip Started');

}

function pauseTrip() {
  Alert.alert('Trip Paused');

}

function endTrip() {

  thisTrip.end();
  Alert.alert('Trip Ended');

}

export default function TripScreen() {
  
  if (!thisTrip.inProgress)
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
          {'Elapsed -   '}{thisTrip.elapsed}{' seconds\n'}
          {'Geo:            '}{'lat: '}{thisTrip.loc.mLatitude}{' long: '}{thisTrip.loc.mLatitude}{'\n'}
          {'Vector:       '}{'distance: '}{thisTrip.distance}{' velocity: '}{thisTrip.v}{'\n'}
        </Text>
      </View>
    </View>
  );

}
