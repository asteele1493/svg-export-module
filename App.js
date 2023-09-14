import React from 'react';
import { View, Button } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { captureRef } from 'react-native-view-shot';
import Heart from './Heart';

export default function App() {
  const handleScreenshot = async () => {
    try {
      // Capture the Heart component as an image
      const uri = await captureRef(this.heartRef, {
        format: 'png',
        quality: 1,
      });

      // Save the captured image to the device's file system
      const filename = `${FileSystem.cacheDirectory}heart_screenshot.png`;
      await FileSystem.moveAsync({
        from: uri,
        to: filename,
      });

      console.log(`Screenshot saved at: ${filename}`);
    } catch (error) {
      console.error('Error capturing screenshot:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View ref={(view) => (this.heartRef = view)}>
        <Heart />
      </View>
      <Button title="Take Screenshot" onPress={handleScreenshot} />
    </View>
  );
}
