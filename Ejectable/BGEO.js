import React from 'react';
import { StyleSheet } from 'react-native';
import { Pressable } from 'react-native';
import { Text, View } from './components/Themed.tsx';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { Trips, setBgOps } from './GT2';

const LOCATION_TASK_NAME = 'background-location-task';

 const requestPermissions = async () => {

  if (!locEnabled) {

  const { status } = await Location.requestBackgroundPermissionsAsync();
  if (status === 'granted') {
    await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
      accuracy: Location.Accuracy.Balanced,
    });
    setBgOps(true);
   }
   else setBgOps(false);

  }

};

export default function PermissionsButton() {
  return(
  <View style={styles.container} lightColor="lime" darkColor="forestgreen">
    <Pressable style={styles.button} onPress={requestPermissions}>
      <Text style={styles.text}>{'Enable background operations'}</Text>
    </Pressable>
  </View>);
}

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {

  if (error) {
    // Error occurred - check `error.message` for more details.
    console.log(error.message);
    return;
  }
  if (data) {
    const { locations } = data;
    Trips.deltaLoc( locations );
  }

});

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    marginBottom: -30,
    alignItems: 'center',
  },
  button: {
    fontSize: 10,
    backgroundColor: 'lime',
  },
});
