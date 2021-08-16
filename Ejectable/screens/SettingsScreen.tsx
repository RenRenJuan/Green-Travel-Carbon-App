import * as React from 'react';
import { StyleSheet, Switch, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useState } from 'react';
import SettingsScreenInfo from '../components/SettingsScreenInfo';

export default function SettingsScreen() {
  const [text, onChangeText] = React.useState("Useless Text");
  const [number, onChangeNumber] = React.useState(null);
  const [isKM, setIsKM] = useState(false);
  const toggleUnits = () => setIsKM(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Model Settings</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <SettingsScreenInfo />
      <Switch
        
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleUnits}
        value={isKM}
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="CO2 Per km/mi"
        keyboardType="numeric"
      />
   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
