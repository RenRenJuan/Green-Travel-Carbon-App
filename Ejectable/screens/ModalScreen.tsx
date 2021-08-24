import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Button, Platform, StyleSheet } from 'react-native';

import EndScreenInfo from '../components/EndScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function ModalScreen({ navigation }: RootTabScreenProps<'Settings'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carbon Impact</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EndScreenInfo path="/screens/ModalScreen.tsx" />
      <Button title={'Dismiss'}
          onPress={() => { navigation.goBack(); }}
        />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
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
});
