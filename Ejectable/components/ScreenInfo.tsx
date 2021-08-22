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
          Switch dark km/ light mi, select fuel used, or specify CO2 g per distance                  
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

export function ScreenInfo3() {
  return (
    <View style={styles.splashContainer}>
        <Text
          style={styles.titleText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Green Travel Calculator v. 2.0.0
        </Text>  
        <Text
          style={styles.versionText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          expo version
        </Text>  
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    marginHorizontal: 50,
    marginVertical: 20,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  settingsContainer: {
    marginHorizontal: 50,
    marginVertical: 20,
  },
  titleText: {
    color: 'white',
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  settingsText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  versionText: {
    color: 'yellow',
    fontSize: 10,
    textAlign: 'center',
  },
});
