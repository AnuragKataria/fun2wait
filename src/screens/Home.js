import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Image,
    Linking,
    PermissionsAndroid,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableNativeFeedback,
    TouchableOpacity,
    View,
} from 'react-native';

import { Colors } from '../common/Colors';
import { ImagesIcons } from '../common/ImagesIcons';
import { Fonts } from '../common/Fonts';
import { getEvents, getNews, getVideos, getWaetherDetails } from '../axios/ServerCall';
import { CommonActions } from '@react-navigation/native';
import { removeUserToken, showToast } from '../common/LocalStorage';
import Geolocation from '@react-native-community/geolocation';
import { Logo } from '../common/Logo';
import AlarmList from './ui/AlarmList';
import MusicUpload from './ui/MusicUpload';
import MusicList from './ui/MusicList';


const Home = (props) => {

    const [index, setIndex] = useState(0)

    const onPress = (ind) => {
        setIndex(ind)
    }

    return (
        <View style={styles.container}>


            <Logo style={{ alignSelf: 'center', marginTop: 10 }} />

            <View style={{ flex: 1 }}>
                {index == 0 ?
                    <AlarmList props={props} />
                    : index == 1 ? <MusicList props={props} />
                        : <></>}

            </View>

            <View style={{ height: 80, alignItems: 'center', backgroundColor: Colors.status_bar, flexDirection: 'row' }}>

                <Pressable
                    onPress={() => onPress(0)}
                    style={[styles.pressable, { backgroundColor: index == 0 ? Colors.white : Colors.status_bar }]}>
                    <Image resizeMode={'contain'} style={styles.img_bottom} source={ImagesIcons.bell} />
                    <Text style={styles.text_register}>{'Alarms'}</Text>

                </Pressable>

                <Pressable
                    onPress={() => onPress(1)}
                    style={[styles.pressable, { backgroundColor: index == 1 ? Colors.white : Colors.status_bar }]}>
                    <Image resizeMode={'contain'} style={styles.img_bottom} source={ImagesIcons.music} />
                    <Text style={styles.text_register}>{'Music'}</Text>

                </Pressable>


                <Pressable
                    onPress={() => onPress(2)}
                    style={[styles.pressable, { backgroundColor: index == 2 ? Colors.white : Colors.status_bar }]}>
                    <Image resizeMode={'contain'} style={styles.img_bottom} source={ImagesIcons.alarm_profile} />
                    <Text style={styles.text_register}>{'Profile'}</Text>

                </Pressable>




            </View>


        </View>


    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    item_internal: {
        marginTop: 5,
        flexDirection: 'row'
    },
    image_row: {
        borderRadius: 5,

        width: 100,
    },

    image_event: {
        resizeMode: 'contain',
        borderRadius: 5,
        height: 80,
        width: 80,
    },
    row_container: {
        paddingVertical: 15,
        flexDirection: 'row'
    },

    image_videos: {
        resizeMode: 'contain',
        borderRadius: 5,
        height: 90,
        width: 120,
    },
    name: {
        marginRight: 10,
        fontSize: 15,
        marginLeft: 10,
        color: Colors.black
    },

    pressable: {
        flex: 1,
        backgroundColor: Colors.status_bar,
        marginHorizontal: 12,
        borderRadius: 50,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        tintColor: Colors.status_bar,
        height: 40,
        alignSelf: 'center',
        width: 50,
    },
    text_login: {
        fontFamily: 'DMSans-Bold',
        fontSize: 15,
        textAlign: 'center',
        color: Colors.white,

    },
    img_bottom: {
        height: 30,
        alignSelf: 'center',
        width: 30,
    },
    item_section: {
        marginVertical: 5,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 5,
    },
    row: {

        borderRadius: 2,
        borderWidth: 1,
        paddingVertical: 10,
        borderColor: Colors.border_stroke,
        backgroundColor: Colors.white,
        marginHorizontal: 10,
        marginVertical: 2.5,
        flexDirection: 'row'
    },

    flatlist: {
        marginHorizontal: 10,
    },
    text: {
        fontFamily: 'DMSans-Bold',
        fontSize: 20,

        marginBottom: 10,
        color: 'white',
    },

    input: {
        height: 55,
        marginTop: 5,
        borderWidth: 1,
        padding: 10,
        fontFamily: 'DMSans-Regular',
        borderRadius: 2,
        color: Colors.black,
        borderColor: Colors.border_stroke,
    },
    input_password: {
        flexDirection: 'row',
        height: 55,
        marginTop: 5,
        borderWidth: 1,
        paddingLeft: 10,
        fontFamily: 'DMSans-Regular',
        borderRadius: 10,
        color: Colors.black,
        borderColor: Colors.border_stroke,
    },

    text_hint: {
        fontFamily: 'DMSans-Regular',
        fontSize: 14,
        marginLeft: 2,
        marginTop: 15,
        color: Colors.placeholder_gray,
    },
    register: {
        borderColor: Colors.status_bar,
        width: '100%',
        borderRadius: 2,
        borderWidth: 1,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 50,
        backgroundColor: Colors.status_bar,
        alignSelf: 'center',
    },

    text_register: {
        fontFamily: 'DMSans-Bold',
        fontSize: 15,
        textAlign: 'center',
        color: Colors.black,
    },
    txt_right: {
        color: Colors.black,
        flex: 1,
        justifyContent: 'flex-end',
        fontSize: 14,
    },
    txt_left: {
        flex: 1,
        fontWeight: 'bold',
        color: Colors.black,
        marginLeft: 0,
        fontSize: 14,
    },
    line: {
        height: .5,
        backgroundColor: Colors.black,

    },
    input_password: {
        flexDirection: 'row',
        height: 55,
        marginTop: 5,
        borderWidth: 1,
        paddingLeft: 10,
        fontFamily: 'DMSans-Regular',
        borderRadius: 10,
        color: Colors.black,
        borderColor: Colors.border_stroke,
    },

    text_hint: {
        fontFamily: 'DMSans-Regular',
        fontSize: 14,
        marginLeft: 2,
        marginTop: 15,
        color: Colors.placeholder_gray,
    },
    register: {

        borderColor: Colors.status_bar,
        width: '100%',
        borderRadius: 2,
        borderWidth: 1,
        height: 50,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 50,
        backgroundColor: Colors.status_bar,
        alignSelf: 'center',
    },

    text_register: {
        fontFamily: 'DMSans-Bold',
        fontSize: 15,
        textAlign: 'center',
        color: Colors.black,

    },
});

export default Home;