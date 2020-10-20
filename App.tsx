/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scanned, setScanned] = useState<boolean>(false);
  const [turnCameraOn, setTurnCameraOn] = useState<boolean>(false);
  const [scannedVin, setScannedVin ] = useState<string>();
  const [torchOn, setTorchOn ] = useState<boolean>(false);
  const [barcodeType, setBarcodeType] = useState<string>();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      {turnCameraOn ? 
        <View style={StyleSheet.absoluteFillObject}>
          <Camera 
          style={{ flex: 1, flexDirection: 'column' }}
          barCodeScannerSettings={{
            barCodeTypes: [
              BarCodeScanner.Constants.BarCodeType.code128, 
              BarCodeScanner.Constants.BarCodeType.code39,
              BarCodeScanner.Constants.BarCodeType.qr
            ]
          }}
          flashMode={torchOn ? 'torch' : 'off'}
          ratio='16:9'
          onBarCodeScanned={scanned ? (obj) => {} : (obj) => {
            setScanned(true);
            setScannedVin(obj.data);
            setBarcodeType(obj.type);
            setTurnCameraOn(false);
            setScanned(false);
          }}>
          <BarcodeMask showAnimatedLine={false} width="90%" edgeColor='#057049'/>
          <TouchableOpacity style={{backgroundColor: 'white', height: 25, borderRadius: 6, alignItems: 'flex-end'}} onPress={() => setTorchOn(!torchOn)}><Text>FlashLight</Text></TouchableOpacity></Camera>
        </View> : 
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Image style={{height: 200, width: '100%' }} source={require('./assets/kglogo.jpg')}></Image>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One: Scan a barcode</Text>
                <View style={{flex: 1}}>
                  <TouchableOpacity 
                  style={{ 
                    alignItems: 'center',
                    borderRadius: 6,
                    backgroundColor: "#057049",
                    width: 100,
                    flex: 1,
                    flexDirection: "column"
                  }} 
                  onPress={() => setTurnCameraOn(!turnCameraOn)}>
                    <Text style={{color: 'white', fontSize: 26}}>Scan</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {!!scannedVin ? <View style={{flex: 1, paddingHorizontal: 24, paddingVertical: 3, flexDirection: 'column'}}>
                <Text style={{fontSize: 24}}>Result: </Text>
                <Text style={{fontSize: 18}}>{scannedVin}</Text>
                <Text>{barcodeType}</Text>
              </View> : null}
            </View>
          </ScrollView>
        </SafeAreaView>}
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
