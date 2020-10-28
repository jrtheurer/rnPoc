/**
 * @format
 */
import { Navigation } from 'react-native-navigation';
import App from './App';
import Printer from './Printer';
import Scanner from './Scanner';
import { Styles } from './Styles';

Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: Styles.colors.KarGreen
  },
  topBar: {
    title: {
      text: 'Yard App',
      color: 'white'
    },
    background: {
      color: Styles.colors.KarGreen
    },
    backButton: {
      color: 'white'
    }
  }
});
Navigation.registerComponent('com.yardapppoc', () => App);
Navigation.registerComponent('scanner', () => Scanner);
Navigation.registerComponent('printer', () => Printer);
Navigation.events().registerAppLaunchedListener(() => {
   Navigation.setRoot({
     root: {
       stack: {
         children: [
           {
             component: {
               name: 'com.yardapppoc'
             }
           }
         ]
       }
     }
  });
});
