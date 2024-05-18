import * as React from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './src/common/Colors';
import Navigation from './src/screens/Navigation';
import { firebase } from '@react-native-firebase/auth';

const App = () => {
   const firebaseConfig = {
    apiKey: "AIzaSyBSWBOhyTSh8l8U0_eJPY0TxJrg51Fkpmc",
    authDomain: "school-79cac.firebaseapp.com",
    databaseURL: "https://school-79cac-default-rtdb.firebaseio.com",
    projectId: "school-79cac",
    storageBucket: "school-79cac.appspot.com",
    messagingSenderId: "645946999652",
    appId: "1:645946999652:web:1d7a1482ce963cd9b4f071",
    measurementId: "G-T05HCZL375"
}


  React.useEffect(() => {
    StatusBar.setHidden(false,);
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }


  }, []);

  

  return (
      <SafeAreaView style={{ flex: 1 }} >
        <StatusBar
          translucent={true}
          animated={false}
          barStyle='light-content'
          backgroundColor={Colors.status_bar}
          hidden={false}
          showHideTransition={false}
        />
      <Navigation />
      </SafeAreaView>        
  );
};

export default App;

