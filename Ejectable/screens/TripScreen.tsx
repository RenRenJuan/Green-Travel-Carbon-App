import * as React from 'react';
import { Button, StyleSheet, Alert } from 'react-native';
import { Text, View } from '../components/Themed';

export default function TripScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Control</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
     
      <View style={styles.controls} >
      <Button
        title="Start"
        onPress={() => Alert.alert('Trip Started')}
      />
      <Button
      title="Pause"
      onPress={() => Alert.alert('Trip Paused')}
      />  
      <Button
      title="Stop"
      onPress={() => Alert.alert('Trip Completed')}
      />
      </View>
    </View>
  );
}

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
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
