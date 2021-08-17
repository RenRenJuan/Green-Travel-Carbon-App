import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function ScreenInfo() {
  return (
    <View style={styles.settingsContainer}>
        <Text
          style={styles.settingsText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Toggle km/mi, select fuel used, or manually set CO2 per distance                  
        </Text>  
    </View>
  );
}
export function ScreenInfo2() {
  return (
    <View style={styles.settingsContainer}>
        <Text
          style={styles.settingsText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Use Pause if fuel burning portion of trip interrupted                  
        </Text>  
    </View>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    marginHorizontal: 50,
    marginVertical: 20,
  },
  settingsText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },

});
