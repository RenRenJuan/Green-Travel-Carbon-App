import * as WebBrowser from 'expo-web-browser';
import React, { useState} from 'react';
import { Button, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/Colors';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';
import { TripSummary } from '../GT2';

export default function EndScreenInfo({ path }: { path: string }) {

  return (
    <View>
      <View style={styles.summaryContainer}>
        <Text
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Summary of this trip:
        </Text>
        <TripSummary/>
        <Text
          style = {styles.helpLinkText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          {'Min trip for carbon accounting\n is 250 meters.'}
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            World Bank on Greenhouse Gas Accounting
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://olc.worldbank.org/content/ghg-accounting-101-self-paced'
  );
}

const styles = StyleSheet.create({
  summaryContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  }, 
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },


});
