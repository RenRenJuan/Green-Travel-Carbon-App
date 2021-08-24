import * as React from 'react';
import { Alert, Button, StyleSheet, Switch, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useState } from 'react';
import ScreenInfo from '../components/ScreenInfo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Trips } from '../GT2';
import { RootTabScreenProps } from '../types';

export default function SettingsScreen( { navigation }: RootTabScreenProps<'Settings'>) {
  const [number, onChangeNumber] = React.useState("");
  const [isKM, setMiles] = useState(false);
  const toggleUnits = () => setMiles(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Model Settings</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
       <ScreenInfo />
       <Switch
        style={styles.switch}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleUnits}
        value={isKM}
       />
       <View style={styles.controls} >
       <Button
         title="Jet"
         onPress={() => {
          Trips.co2Rate = 285.0; 
          Trips.CO2Effect = "carbon burden";
          Alert.alert('Jet Fuel Selected \n 285 g / passenger / km')}
         }
       />
       <Button
       title="Gasoline"
       onPress={() => {
           Trips.co2Rate   = 255.0; 
           Trips.CO2Effect = "carbon burden";
           Alert.alert('Gasoline Selected \n 255 g for driver \n only passenger / km')}
         }
       />  
       <Button
       title="Food"
       onPress={() => {
            Trips.co2Rate = -255.0; 
            Trips.CO2Effect = "carbon relief";
            Alert.alert('Savings vs Gasoline Selected')}
          }
       />
       </View>
       <TextInput   
        style={styles.input}
        returnKeyType={'done'}
        onChangeText={onChangeNumber}
        value={number}
        placeholder={Trips.co2Rate.toString()}
        keyboardType="numeric"
       />      
    </View>
  );
}


const styles = StyleSheet.create({
  switch: {
    marginVertical: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    marginVertical: 20,
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
  input: {
    height: 40,
    margin: 30,
    borderWidth: 1,
    padding: 10,
  },
});
