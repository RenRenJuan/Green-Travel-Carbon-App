import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Alert, Text } from 'react-native';
import * as Location from 'expo-location';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Trips } from './GT2';

       var debug:boolean      = false;
       var expoGeoState:any   = null;
       var advised:boolean    = false;

export function getAdvised() : boolean { return advised; }
export function setAdvised() : void    { advised = true; }

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  const [isKM, setIsKM] = useState(false);
  const toggleUnits = () => setIsKM(previousState => !previousState);
  
  
   const [location, setLocation] = useState(Object);
   const [errorMsg, setErrorMsg] = useState("");

   useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        Trips.setLocEnabled(false);
        Alert.alert("Permission to access location was denied, this app requires it.");
        return;
      } else Trips.setLocEnabled(true);

      if (debug) {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      Trips.deltaLoc(location);
      }
    })();
   }, []);

   expoGeoState = 'Waiting..';
   if (errorMsg) {
    expoGeoState = errorMsg;
   } else if (location) { 
    expoGeoState = JSON.stringify(location);
   }
  

  if (!isLoadingComplete) {
    return null;
  } else {
    if (!debug)
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
    else
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <Text>{expoGeoState}</Text>
        <StatusBar />
      </SafeAreaProvider>
    );
  }

}
