import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Navigation } from 'react-native-navigation';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { Styles } from './Styles';

const App = ({ componentId }) => {
  const [hasPermission, setHasPermission] = useState<boolean>();
  const [scannedData, setScannedData] = useState();

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
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={{flex: 1, backgroundColor: '#ffffff', alignItems: 'center'}}><Image style={{height: 200, width: '90%' }} source={require('./assets/kglogo.jpg')}></Image></View>
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
                  onPress={() => Navigation.push(componentId, { 
                    component: {
                      name: 'scanner',
                      passProps: {
                        setData: (data) => setScannedData(data)
                      }
                    }
                   })}>
                    <Text style={{color: 'white', fontSize: 26}}>Scan</Text>
                  </TouchableOpacity>
                </View>
                {!!scannedData ? <View style={{flex: 1, paddingHorizontal: 24, paddingVertical: 3, flexDirection: 'column'}}>
                <Text style={{fontSize: 24}}>Result: </Text>
                <Text style={{fontSize: 18}}>{scannedData}</Text>
              </View> : null}
                </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step Two: Print a sticker</Text>
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
                  onPress={() => Navigation.push(componentId, { 
                    component: {
                      name: 'printer'
                    }
                   })}>
                    <Text style={{color: 'white', fontSize: 26}}>Print</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
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
  }
});

export default App;
