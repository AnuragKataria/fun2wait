import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import Splash from './Splash';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import Details from './Details';



const Stack = createStackNavigator();
const Navigation = () => {

    const options = {

        ...TransitionPresets.SlideFromRightIOS,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerShown: false, presentation: 'modal'

    };

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Splash'>

                <Stack.Screen
                    name="Splash"
                    component={Splash}
                    options={() => options} />

                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={() => options} />

                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={() => options} />

                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={() => options} />
                <Stack.Screen
                    name="Details"
                    component={Details}
                    options={() => options} />


            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default Navigation;