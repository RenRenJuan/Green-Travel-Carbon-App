import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

export default function SettingsScreenInfo() {
  return (
    <View style={styles.settingsContainer}>
        <Text
          style={styles.settingsText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Toggle km/mi, set CO2/ea
                   
        </Text>  
    </View>
  );
}

const styles = StyleSheet.create({
  settingsContainer: {
    marginHorizontal: 50,
  },
  settingsText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },

});
