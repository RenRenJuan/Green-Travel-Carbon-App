import React from 'react';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Alert, Pressable } from 'react-native';
import { Text, View } from './components/Themed.tsx';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { bgOps, Trips, setBgOps } from './GT2';

const BACKGROUND_LOCATION_TRACKER = 'BACKGROUND_LOCATION_TRACKER'


const getUpdates = async () => {

    await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TRACKER , {
      accuracy: Location.Accuracy.Highest
    });
   
};

export default function PermissionsButton() {

  const [fuBgOps, setfuBgOps] = useState(0);
  
  const requestPermissions = async () => {
    const { status } = await Location.requestBackgroundPermissionsAsync();
    setBgOps((status === 'granted'));
    setfuBgOps(fuBgOps => fuBgOps + 1);
  };

  if (!bgOps)
  return(
  <View style={styles.container} lightColor="lime" darkColor="forestgreen">
    <Pressable style={styles.button}
     onPressIn={requestPermissions }>
      <Text style={styles.text}>{'Enable background operations'}</Text>
      <Text style={styles.text2}>{'            (Only used during a trip)'}</Text>
    </Pressable>
  </View>);
  else
  return(
  <View style={styles.container} lightColor="lime" darkColor="forestgreen">
      <Text style={styles.text}>{'Trips can run in background.'}</Text>
  </View>);

}

TaskManager.defineTask(BACKGROUND_LOCATION_TRACKER , async ({ data, error }) => {

  if (error) {
    // Error occurred - check `error.message` for more details.
    console.log(error.message);
    return;
  }

  if (data) {
    const { location } = data;
    Trips.deltaLoc( location );
  }
  
});

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    marginTop:  -20,
    marginBottom: 15,
    alignItems: 'center',
  },
  button: {
    fontSize: 10,
    backgroundColor: 'lime',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: "blue",
  },
  text2: {
    fontSize: 10,
    color: "navy",
  }
});
