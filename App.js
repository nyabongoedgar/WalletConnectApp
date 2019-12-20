import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [barCodeResult, setBarCodeResult] = useState('');
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  function onBarCodeScanned(dataObject){
    return setBarCodeResult(dataObject.data);
  }

  return (
    <React.Fragment>
      <Camera
        onBarCodeScanned={(dataObject) => onBarCodeScanned(dataObject)}
        style={styles.cameraView}
        type={type}
      >
      </Camera>
      <Text>{barCodeResult !== '' ? barCodeResult : ''}</Text>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraView: {
    width: 250,
    height: 250,
    borderRadius: 30,
  },
});


