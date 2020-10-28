import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import RNZebraBluetoothPrinter from 'react-native-zebra-bluetooth-printer';
import { Styles } from './Styles';
import { PrinterCommands } from './PrinterCommands';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Navigation } from 'react-native-navigation';

const Printer = ({componentId}) => {

  const [deviceId, setDeviceId] = useState<string>();
  const [isPrinting, setIsPrinting] = useState<boolean>();
  useEffect(() => {
    (async () => {
      // const isEnabled: boolean = await RNZebraBluetoothPrinter.isEnabledBluetooth();
      // if (!isEnabled) {
      //   Alert.alert('Please enable bluetooth and try again.');
      //   Navigation.pop(componentId)
      // }
      // else {
      //   const devices: {type: string, name: string, class: number, address: string}[] = await RNZebraBluetoothPrinter.pairedDevices();
      //   console.log(JSON.stringify(devices));

        const deviceId = 'AC:3F:A4:74:30:99';
        // await RNZebraBluetoothPrinter.connectDevice(deviceId);
        setDeviceId(deviceId);
      // }
    })();
  });

  const zplString = [
    PrinterCommands.begin,
    PrinterCommands.font('0', '160'),
    PrinterCommands.rotateNormal,
    PrinterCommands.centeredFieldBlock,
    PrinterCommands.fieldOffset('0', '55'),
    PrinterCommands.fieldData,
    (new Date()).toLocaleDateString(),
    PrinterCommands.font('0', '35'),
    PrinterCommands.centeredFieldBlock,
    PrinterCommands.fieldOffset('0', '265'),
    PrinterCommands.fieldData,
    'Carvana',
    PrinterCommands.font('0', '240'),
    PrinterCommands.centeredFieldBlock,
    PrinterCommands.fieldOffset('0', '375'),
    PrinterCommands.fieldData,
    '(D) (140)',
    PrinterCommands.font('0', '180'),
    PrinterCommands.centeredFieldBlock,
    PrinterCommands.fieldOffset('0', '665'),
    PrinterCommands.fieldData,
    '90000',
    PrinterCommands.font('0', '40'),
    PrinterCommands.fieldOffset('25', '900'),
    PrinterCommands.fieldData,
    '3B7HF13Y81G193584',
    PrinterCommands.font('0', '80'),
    PrinterCommands.fieldOffset('25', '950'),
    PrinterCommands.fieldData,
    '2015',
    PrinterCommands.font('0', '50'),
    PrinterCommands.fieldOffset('25', '1020'),
    PrinterCommands.fieldData,
    'Chevrolet',
    PrinterCommands.font('0', '50'),
    PrinterCommands.fieldOffset('25', '1070'),
    PrinterCommands.fieldData,
    'Tahoe',
    PrinterCommands.font('0', '30'),
    PrinterCommands.fieldOffset('25', '1170'),
    PrinterCommands.fieldData,
    `(${(new Date()).toLocaleDateString()}) (jtheurer)`,
    PrinterCommands.fieldOffset('530', '900'),
    PrinterCommands.qrCode('3B7HF13Y81G193584'),
    PrinterCommands.font('0', '30'),
    PrinterCommands.fieldOffset('715', '1170'),
    PrinterCommands.fieldData,
    '987654',
    PrinterCommands.end
  ].join('');

  '^XA^CF0,160^FWN^FB830,1,0,C^FO0,55^FDOct 22, 2020^CF0,35^FB830,1,0,C^FO0,265^FDCarvana^CF0,240^FB830,1,0,C^FO0,375^FD(D) (140)^CF0,180^FB830,1,0,C^FO0,665^FD90000^CF0,40^FO25,900^FD3B7HF13Y81G193584^CF0,80^FO25,950^FD2015^CF0,50^FO25,1020^FDChevrolet^CF0,50^FO25,1070^FDTahoe^CF0,30^FO25,1170^FD(Oct 22, 2020) (jtheurer)^FO530,900^BQR,2,10^FDQA,3B7HF13Y81G193584^FS^CF0,30^FO715,1170^FD987654^XZ'
        

  return (<>
    {isPrinting ? <ActivityIndicator /> : null}
      <View style={{flex: 1, flexDirection: 'column'}}>
      <View style={{height: 100}}>
      <Text>Click the print button below to print your sticker.</Text>
        <TouchableOpacity style={{ 
          marginTop: 25,
          marginLeft: 24,
          alignItems: 'center',
          borderRadius: 6,
          backgroundColor: Styles.colors.KarGreen,
          width: 100,
          flex: 1,
          flexDirection: 'column'
        }} onPress={async () => {
          console.log('Printing zpl:', zplString);
          setIsPrinting(true)
          await RNZebraBluetoothPrinter.print(deviceId, zplString);
          setIsPrinting(false);
        }}>
          <Text style={{color: 'white'}}>PRINT</Text>
        </TouchableOpacity>
        </View>
        </View>
      
    </>)
};

export default Printer;