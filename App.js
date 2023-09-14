import React, { useRef, useEffect, useState } from 'react';
import { View, Button, Alert } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions'; // Import the Permissions module
import Heart from './components/Heart';

export default function App() {
  const heartRef = useRef(null);
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);

  useEffect(() => {
    // Check and request permissions when the component mounts
    async function checkMediaLibraryPermission() {
      const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
      setMediaLibraryPermission(status === 'granted');
    }

    checkMediaLibraryPermission();
  }, []);

  const handleScreenshot = async () => {
    try {
      if (!mediaLibraryPermission) {
        Alert.alert(
          'Permission Required',
          'Please grant access to the media library to save the screenshot.'
        );
        return;
      }

      if (!heartRef.current) {
        return;
      }

      // Capture the Heart component as an image
      const uri = await captureRef(heartRef, {
        format: 'png',
        quality: 1,
      });

      // Save the captured image to the device's media library (camera roll)
      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync('HeartScreenshots', asset, false);

      console.log(`Screenshot saved in the camera roll`);
      Alert.alert('Screenshot Saved', 'The screenshot has been saved to your camera roll.');
    } catch (error) {
      console.error('Error capturing or saving screenshot:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View ref={heartRef}>
        <Heart />
      </View>
      <Button title="Take Screenshot" onPress={handleScreenshot} />
    </View>
  );
}