import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Camera } from 'expo-camera';
import { StyleSheet, View, TouchableOpacity, Text, StatusBar } from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import { Navigation } from 'react-native-navigation';
import { Styles } from './Styles';

const Scanner = ({componentId, setData}) => {
  const [scanned, setScanned] = useState<boolean>(false);
  const [torchOn, setTorchOn ] = useState<boolean>(false);
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [shouldMountCam, setShouldMountCam] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    // const listener = {
    //   componentDidDisappear: () => {
    //     setShouldMountCam(false);
    //   },
    //   componentDidAppear: () => {
    //     setShouldMountCam(true);
    //   }
    // };

    // const unsub = Navigation.events().registerComponentListener(listener, componentId);

    // return () => {
    //   setScanned(false);
    //   unsub.remove();
    // };
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <View><Text>No access to camera</Text></View>;
  }

  return(
  <> 
  <View style={StyleSheet.absoluteFillObject}>
  <Camera 
  style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}
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
    Navigation.pop(componentId);
    setData(obj.data);
  }}>
    <BarcodeMask showAnimatedLine={false} width='90%' edgeColor={Styles.colors.KarGreen}/>
    <TouchableOpacity style={{backgroundColor: 'white', height: 25, borderRadius: 6, alignItems: 'flex-end'}} onPress={() => setTorchOn(!torchOn)}>
      <Text>FlashLight</Text>
    </TouchableOpacity>
  </Camera>
</View>
</>);
}

export default Scanner;
