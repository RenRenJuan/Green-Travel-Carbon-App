import * as React from 'react';
import { Alert, Button, StyleSheet, Switch, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { useState } from 'react';
import ScreenInfo,  { ScreenInfo4, ScreenInfo5  } from '../components/ScreenInfo';
import { Trips } from '../GT2';
import { RootTabScreenProps } from '../types';


export default function SettingsScreen( { navigation }: RootTabScreenProps<'Settings'>) {
  const [rate, setRate]  = useState("255");
  const [sens, setSens]  = useState("3");
  const [isKM, setMiles] = useState(false);
  const toggleUnits = () => { setMiles(previousState => !previousState)
           Trips.units = isKM ? "km" : "mi";
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Model Settings</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
       <Text style={styles.caption}>{'\nset custom CO2 rate or use buttons below'}</Text> 
       <View style={styles.inputs}>
       <TextInput   
        style={styles.input}
        returnKeyType={'done'}
        onChangeText={rate => { setRate(rate); Trips.co2Rate = Number(rate);} }
        value={rate}
        placeholder={Trips.co2Rate.toString()}
        keyboardType="numeric"
       />    
       </View>
       <Text style={styles.caption}>{'\nsensitivity'}</Text>  
       <View style={styles.inputs}>
       <TextInput   
        style={styles.input}
        returnKeyType={'done'}
        onChangeText={sens => { setSens(sens); 
            var s = Number(sens);
            if (s < 3 || s > 7) Alert.alert("Sensitivity must be greater than 2 and less than 8");
            else Trips.sensitivity = Number(sens); }}
        value={sens}
        placeholder={Trips.sensitivity.toString()}
        keyboardType="numeric"
       />      
       </View>  
       <ScreenInfo4/>
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
       <ScreenInfo />
       <Switch
        style={styles.switch}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={true ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleUnits}
        value={isKM}
       />
    </View>
  );
}


const styles = StyleSheet.create({
  caption: {
    fontSize: 10,
    justifyContent: 'center',
  },
  switch: {
    marginVertical: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  controls: {
    marginVertical: 5,
    width: "80%",
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  inputs: {
    marginVertical: 5,
    width: "80%",
    flexDirection: 'row',
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 2,
    height: 1,
    width: '80%',
  },
  input: {
    height: 40,
    margin: 30,
    borderWidth: 1,
    padding: 10,
  },
  input2: {
    height: 40,
    margin: 30,
    borderWidth: 1,
    padding: 10,
  },
});
