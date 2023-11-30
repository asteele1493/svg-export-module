import React, { useState, useRef } from "react";
import { View, Image, TouchableOpacity, Button, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { State, PinchGestureHandler } from "react-native-gesture-handler";

const ImageImport = ({ setCapturedUri }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [pinchScale, setPinchScale] = useState(1);
  const pinchRef = useRef(null);

  const isValidImageFormat = (uri) => {
    const allowedExtensions = [".png", ".jpg", ".jpeg"];
    const uriLowerCase = uri.toLowerCase();
    return allowedExtensions.some((extension) =>
      uriLowerCase.endsWith(extension)
    );
  };

  const handlePinchGesture = (event) => {
    setPinchScale(event.nativeEvent.scale);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      console.error("Image selection has been cancelled.");
      setSelectedImage(result.assets[0].uri);
      setCapturedUri(result.assets[0].uri);
    }

    if (result.assets && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;

      if (isValidImageFormat(selectedImageUri)) {
        setSelectedImage(selectedImageUri);
        setCapturedUri(selectedImageUri);
      } else {
        console.error(
          "Invalid file format. Please select a PNG or JPG image."
        );
      }
    } else {
      console.error("No image selected or invalid image format.");
    }
  };

  const handlePinchGestureEnd = (event) => {
    const minScale = 0.5;
    const maxScale = 2.0;

    let newScale = pinchScale;

    if (pinchScale < minScale) {
      newScale = minScale;
    } else if (pinchScale > maxScale) {
      newScale = maxScale;
    }

    setPinchScale(newScale);
  };

  return (
    <View>
      <Button 
        title='Import an Image' 
        onPress={pickImage}
        color='black'
      />
      {selectedImage && (
        <PinchGestureHandler
          onGestureEvent={handlePinchGesture}
          onHandlerStateChange={(event) => {
            if (event.nativeEvent.state === State.END) {
              handlePinchGestureEnd(event);
            }
          }}
          ref={pinchRef}
        >
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 300 * pinchScale, height: 200 * pinchScale }}
          />
        </PinchGestureHandler>
      )}
    </View>
  );
};

export default ImageImport;
