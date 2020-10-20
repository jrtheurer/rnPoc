/**
 * @format
 */
import { Navigation } from 'react-native-navigation';
import App from './App';
import Scanner from './Scanner';
import { Styles } from './Styles';

Navigation.registerComponent('com.yardapppoc', () => App);
Navigation.registerComponent('scanner', () => Scanner);
Navigation.setDefaultOptions({
  statusBar: {
    backgroundColor: Styles.colors.KarGreen
  },
  topBar: {
    title: {
      color: 'white'
    },
    background: Styles.colors.KarGreen,
    backButton: {
      color: 'white'
    }
  }
});
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
