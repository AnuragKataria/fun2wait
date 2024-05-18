import React, { useEffect } from 'react';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';

import { Colors } from '../common/Colors';
import { ImagesIcons } from '../common/ImagesIcons';
import { getLoginObject, getUserToken } from '../common/LocalStorage';
import { Logo } from '../common/Logo';


const Splash = (props) => {

    const moveToOnBoard = async () => {
        props?.navigation.replace('Login')
    }

    const moveToHome = () => {
        props?.navigation.replace('Home')
    }

    useEffect(() => {
        setTimeout(async () => {
            const user = await getLoginObject();
            console.log('USER', JSON.parse(user))
            if (user) {
                moveToHome();
            } else {
                moveToOnBoard();
            }
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
            <Logo style={{ alignSelf: 'center' }} />

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    img: {
        tintColor: Colors.status_bar,
        height: 80,
        width: 80
    },

});

export default Splash;