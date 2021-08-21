import * as React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { Text, View } from '../components/Themed';
import { ScreenInfo3 } from '../components/ScreenInfo';

const image = { uri: "https://meansofproduction.biz/images/GREENT.jpg" };

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
       <Text style={styles.title}>GT2</Text>
       <View style={styles.separator} />  
       <ScreenInfo3 />
      </ImageBackground> 
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center"
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
});
