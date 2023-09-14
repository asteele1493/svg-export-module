# svg-export-module

## Functionality

The purpose of this repository is to act as a sandbox in creating a React Native module that can interact with and successfully export SVG files. 

## Drawbacks

The modules built in to React Native View Shot would require us to select specific file formats to save the ```<View/>``` to.

## Notes

- expo media library package to save to camera roll. Not sure if this option would be successful in tandem or as an aside to using React Native's camera-roll package.

This application requires the following dependencies: 

 [React Native SVG](https://www.npmjs.com/package/react-native-svg)
  - ```expo install react-native-svg``` 
  

  [React Native View-Shot](https://www.npmjs.com/package/react-native-view-shot)
  - ```expo install react-native-view-shot``` 
  
  [Expo Media Library](https://docs.expo.dev/versions/latest/sdk/media-library/)
  - ```npx expo install expo-media-library```

  [Expo Permissions](https://docs.expo.dev/guides/permissions/)
  - ```expo install expo-permissions```
