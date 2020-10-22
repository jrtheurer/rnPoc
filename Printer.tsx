import React, { useEffect, useState } from 'react';
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';
import { Styles } from './Styles';
import { PrinterCommands } from './PrinterCommands';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Printer = () => {

  const [deviceId, setDeviceId] = useState<string>();
  const [isPrinting, setIsPrinting] = useState<boolean>();
  useEffect(() => {
    (async () => {
      // const isEnabled: boolean = await RNZebraBluetoothPrinter.isEnabledBluetooth();
      // if (!isEnabled) await RNZebraBluetoothPrinter.enableBluetooth();
      const devices: {type: string, name: string, class: number, address: string}[] = await RNZebraBluetoothPrinter.pairedDevices();
      const deviceId = 'AC:3F:A4:74:30:99';

      console.log(JSON.stringify(devices));
      // RNZebraBluetoothPrinter.connectDevice(deviceId);

      // const printer = devices.filter(r => r.name === 'printer')[0];
      setDeviceId(deviceId);
    })();
  });

  const zplString = [
    PrinterCommands.begin,
    PrinterCommands.fieldOrigin,
    '50,50',
    '^ADN,36,20',
    PrinterCommands.fieldData,
    'Jeremiah Theurer',
    PrinterCommands.rotate90,
    PrinterCommands.fieldOrigin,
    '200,200',
    PrinterCommands.qrCode('https://google.com'),
    PrinterCommands.end
  ].join('');

  return (<>
    {isPrinting ? <ActivityIndicator /> : null}
      <View style={{flex: 1, flexDirection: 'column'}}>
        <TouchableOpacity style={{ 
          marginTop: 25,
          alignItems: 'center',
          borderRadius: 6,
          backgroundColor: Styles.colors.KarGreen,
          width: 100,
          flex: 1,
          flexDirection: "column"
        }} onPress={async () => {
          setIsPrinting(true)
          await RNZebraBluetoothPrinter.print(deviceId, zplString);
          setIsPrinting(false);
        }}>
          <Text>PRINT</Text>
        </TouchableOpacity>
      </View>
    </>)
};

Printer.options = {
  topBar: {
    title: {
      text: 'Printer',
      color: 'white'
    },
    background: {
      color: Styles.colors.KarGreen
    }
  }
}

export default Printer;