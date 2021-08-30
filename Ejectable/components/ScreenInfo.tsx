import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from './Themed';
import * as Device from 'expo-device';
import { bgOps, ver } from '../GT2';
import PermissionsButton from '../BGEO';

export default function ScreenInfo() {
  return (
    <View style={styles.settingsContainer}>
        <Text
          style={styles.switchText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {'Switch dark: km, light: mi'}                  
        </Text>  
    </View>
  );
}
export function ScreenInfo2() {
  return (
    <View>
        <Text
          style={styles.tripControlText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {'Pause trip if fuel burning interrupted.\n'}
         </Text>  
    </View>
  );
}
export function ScreenInfo4() {
  return (
    <View style={styles.settingsContainer}>
        <Text
          style={styles.sensitive}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {'set CO2 rate above or \nselect fuel type below\nhigher sensitivity may cause\n spurious motion at rest'}                
        </Text>  
    </View>
  );
}

export function ScreenInfo5() {
  return (
    <View style={styles.settingsContainer}>
        <Text
          style={styles.sensitive}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {'set CO2 rate or use fuel type buttons below'}                
        </Text>  
    </View>
  );
}

export function ScreenInfo3() {
  if (bgOps)
  return (
    <View style={styles.splashContainer}>
        <Text
          style={styles.titleText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {'Green Travel Calculator v. ' + ver }
        </Text>  
        <Text
          style={styles.versionText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          expo {Device.osName == 'iOS' ? 'iOS ' : 'android '} version
        </Text>  
        <Text
          style={styles.cautionText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {'\nNote: accuracy depends on sensitivity setting, your device, and carrier.'}
        </Text>  
    </View>
  );
  else
  return (
    <View style={styles.splashContainer}>
        <Text
          style={styles.titleText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {'Green Travel Calculator v. ' + ver }
        </Text>  
        <Text
          style={styles.versionText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          expo {Device.osName == 'iOS' ? 'iOS ' : 'android '} version
        </Text>  
        <PermissionsButton />
        <Text
          style={styles.cautionText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {'\nNote: accuracy depends on sensitivity setting, your device, and carrier.'}
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
  sensitive: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  switchText: {
    fontSize: 10,
    lineHeight: 24,
    textAlign: 'center',
  },
  settingsText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  tripControlText: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 24,
    textAlign: 'center',
  },
  versionText: {
    color: 'yellow',
    fontSize: 10,
    textAlign: 'center',
  },
  cautionText: {
    top: 90,
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
});
