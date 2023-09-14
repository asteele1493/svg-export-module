import React from 'react';
import { Text, View } from 'react-native';
import TestView from './components/TestView';
import captureRef from 'react-native-view-shot';

captureRef(TestView, {
  format: "png",
  quality: 1,
}).then(
  (uri) => console.log("Image saved to", uri),
  (error) => console.error("oops, snapshot failed", error)
);

export default function App () {
  return(
    <View
      style = {styles.container}>
        <Text>This is a test view!</Text>
        <TestView/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
