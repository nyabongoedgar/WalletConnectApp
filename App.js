import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import RNWalletConnect from "@walletconnect/react-native";
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

  const walletConnector = new RNWalletConnect(
    {
      uri: barCodeResult !== '' ? barCodeResult : undefined
    },
    {
      clientMeta: {
        // Required
        description: "WalletConnect Developer App",
        url: "https://walletconnect.org",
        icons: ["https://walletconnect.org/walletconnect-logo.png"],
        name: "WalletConnect",
        ssl: true
      },
      push: {
        // Optional
        url: "https://push.walletconnect.org",
        type: "fcm",
        token: token,
        peerMeta: true,
        language: language
      }
    }
  );

  // Subscribe to session requests
  walletConnector.on("session_request", (error, payload) => {
    if (error) {
      throw error;
    }
  });

  // Subscribe to call requests
walletConnector.on("call_request", (error, payload) => {
  if (error) {
      throw error;
  }
});

walletConnector.on("disconnect", (error, payload) => {
  if (error) {
      throw error;
  }

  // Delete walletConnector
});


//manage connection
// Approve Session
walletConnector.approveSession({
  accounts: [                 // required
      '0x4292...931B3',
      '0xa4a7...784E8',
  ],
  chainId: 1                  // required
})

// Reject Session
walletConnector.rejectSession({
  message: 'OPTIONAL_ERROR_MESSAGE'       // optional
})


// Kill Session
walletConnector.killSession()

// Approve Call Request
walletConnector.approveRequest({
  id: 1,
  result: "0x41791102999c339c844880b23950704cc43aa840f3739e365323cda4dfa89e7a"
});

// Reject Call Request
walletConnector.rejectRequest({
  id: 1,                                  // required
  error: {
      code: "OPTIONAL_ERROR_CODE",           // optional
      message: "OPTIONAL_ERROR_MESSAGE"     // optional
  }
});

  return (
    <React.Fragment>
      {barCodeResult === '' ?
        (<Camera
          onBarCodeScanned={(dataObject) => setBarCodeResult(dataObject.data)}
          style={styles.cameraView}
          type={type}
        >
        </Camera>) : (<View><Text>URL : {barCodeResult}</Text><Button title="Scan Again" onPress={() => setBarCodeResult('')} /></View>)}
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


