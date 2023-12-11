import React, { useEffect } from 'react';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';

import { Colors } from '../common/Colors';
import { Logo } from '../common/Logo';
import { ImagesIcons } from '../common/ImagesIcons';
import { getUserToken } from '../common/LocalStorage';


const Splash = (props) => {

    const moveToOnBoard = async () => {
    const token = await getUserToken();
    console.log(token)
    if(token != 'false'){
        props?.navigation.replace('Home')
    }else{
        props?.navigation.replace('Login')
    }

        
    }
    useEffect(() => {
        setTimeout(function () {
           moveToOnBoard();
        }, 2000);
    }, []);

    return (
        <View style={styles.container}>
             <Image resizeMode={'contain'} style={styles.img} source={ImagesIcons._logo}/>
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
    tintColor:Colors.status_bar,
       height:80,
       width:80
    },

});

export default Splash;