import * as React from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from './src/common/Colors';
import Navigation from './src/screens/Navigation';

const App = () => {
  React.useEffect(() => {
    StatusBar.setHidden(false,);
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

