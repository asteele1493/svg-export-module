import React, { useRef, useEffect, useState } from 'react';
import { View, Button, Alert, PixelRatio, ScrollView } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Permissions from 'expo-permissions'; 
import Heart from './components/Heart';
import ImageImport from './components/Import';

export default function App() {
  const heartRef = useRef(null);
  const [mediaLibraryPermission, setMediaLibraryPermission] = useState(null);
  let uri = 'None';

  const targetPixelCount = 1080; // If you want full HD pictures
  const pixelRatio = PixelRatio.get(); // The pixel ratio of the device
  // pixels * pixelratio = targetPixelCount, so pixels = targetPixelCount / pixelRatio
  const pixels = targetPixelCount / pixelRatio;

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
      uri = await captureRef(heartRef, {
        format: 'png',
        // result: 'base64',
        quality: 1,
        height: pixels,
        width: pixels,
      });
      console.log(uri)

      // Save the captured image to the device's media library (camera roll)
      // Or FileSystem library could be implemented here using FileSystem.makeDirectoryAsync()
      const asset = await MediaLibrary.createAssetAsync(uri);
      console.log(asset)

      await MediaLibrary.createAlbumAsync('HeartScreenshots', asset, false);

      console.log(`Screenshot saved in the camera roll`);
      Alert.alert('Screenshot Saved', 'The screenshot has been saved to your camera roll.');
    } catch (error) {
      console.error('Error capturing or saving screenshot:', error);
    }
  };

  return (
  <ScrollView style={{ flex: 1 }}>
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <View ref={heartRef}>
        <Heart />
      </View>
      <Button title="Take Screenshot" onPress={handleScreenshot} />
      <ImageImport/>
    </View>
  </ScrollView>  
  );
}