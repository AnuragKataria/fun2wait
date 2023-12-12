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


const Home = (props) => {
    const [news, setNews] = useState([]);
    const [events, setEvents] = useState([]);
    const [videos, setVideos] = useState([]);
    const [weather, setWeather] = useState([]);
    const [index, setIndex] = useState(1);
    const [selected, setSelected] = useState(1);
    const [type, setType] = useState('coffee');
    const [location, setLocation] = useState('USA');
    const [title, setTitle] = useState('News');
    const [viewType, setView] = useState(1);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState(null);

    const setLatLngs = (info) => {
        console.log(info)
        setLatitude(info?.coords?.latitude)
        setLongitude(info?.coords?.longitude)
    }
    const fireApi = () => {
        if (index == 3) {
            if (!type) {
                showToast('Please enter Type')
            } else {
                setView(2);
                _getVideos();
            }
        } else if (index == 4) {
            if (!location) {
                showToast('Please enter location')
            } else {
                setView(2);
                _getWeatherDetails();
            }
        }



    }
    const fireEventApi = () => {

        if (!type) {
            showToast('Please enter Type')
        } else if (!location) {
            showToast('Please enter location')
        } else {
            setView(2);
            _getEvents();
        }


    }
    const Row = (prop) => {
        const [defaultImage, setDefaultImage] = useState(false);
       return <Pressable style={styles.item_section}
            onPress={() =>
                props?.navigation?.navigate('Details', {
                    title: prop?.item?.title,
                    desc: prop?.item?.text,
                })

            }
        >
            <View style={styles.item_internal}>
                <Image
                    onError={() => setDefaultImage(true)}
                    style={styles.image_row}
                    source={{ uri: !defaultImage ? prop?.item?.image : 'https://img.freepik.com/premium-vector/speech-bubble-with-latest-news-text-speech-bubble-with-loudspeaker-pop-art-style-vector-line-icon-business-advertising_748571-643.jpg' }} />

                <View style={{ flex: 1 }} >
                    <Text numberOfLines={2} style={[styles.name, { fontWeight: "bold" }]}>{prop?.item?.title}</Text>
                    <Text numberOfLines={3} style={[styles.name, { marginTop: 5 }]}>{prop?.item?.text}</Text>
                </View>

            </View>


            <Text style={[styles.name, { alignSelf: 'flex-end', marginVertical: 5 }]}>{prop?.item?.publish_date?.split(' ')[0]}</Text>

            <Text style={{ backgroundColor: Colors.light_gray_back, height: 2, marginTop: 0 }} />
        </Pressable>
    }
    const RowEvents = (prop) => (

        <Pressable style={styles.item_section}
            onPress={() =>
                props?.navigation?.navigate('Details', {
                    title: prop?.item?.title,
                    desc: prop?.item?.description,
                })

            }
        >
            <View style={styles.item_internal}>
                <Image
                    resizeMode='contain'
                    style={styles.image_event} source={{ uri: prop?.item?.image }} />

                <View style={{ flex: 1 }} >
                    <Text numberOfLines={2} style={[styles.name, { fontWeight: "bold" }]}>{prop?.item?.title}</Text>
                    <Text numberOfLines={3} style={[styles.name, { marginTop: 5 }]}>{prop?.item?.description}</Text>
                </View>

            </View>


            <Text style={[styles.name, { alignSelf: 'flex-end', marginVertical: 5 }]}>{prop?.item?.date?.when}</Text>

            <Text style={{ backgroundColor: Colors.light_gray_back, height: 2, marginTop: 0 }} />
        </Pressable>
    );
    const RowVideos = (props) => (

        <Pressable style={styles.item_section}
            onPress={() =>
                Linking.openURL('https://www.youtube.com/watch?v=' + props?.item?.id?.videoId)
            }
        >
            <View style={styles.item_internal}>
                <Image
                    resizeMode='contain'
                    style={styles.image_videos} source={{ uri: props?.item?.snippet?.thumbnails?.default?.url }} />

                <View style={{ flex: 1 }} >
                    <Text numberOfLines={2} style={[styles.name, { fontWeight: "bold" }]}>{props?.item?.snippet?.title}</Text>
                    <Text numberOfLines={3} style={[styles.name, { marginTop: 5 }]}>{props?.item?.snippet?.description}</Text>
                </View>

            </View>


            <Text style={[styles.name, { alignSelf: 'flex-end', marginVertical: 5 }]}>{props?.item?.snippet?.publishTime?.split('T')[0]}</Text>

            <Text style={{ backgroundColor: Colors.light_gray_back, height: 2, marginTop: 0 }} />
        </Pressable>
    );
    const RowWeatherDetails = (props) => (

        <Pressable style={styles.item_section}>
            <View style={styles.item_internal}>

                <View >

                    <Text numberOfLines={2} style={[styles.name, { fontWeight: "bold", marginTop: 5 }]}>{'Time:'}</Text>
                    <Text numberOfLines={2} style={[styles.name, { fontWeight: "bold", marginTop: 5 }]}>{'Humidity:'}</Text>
                    <Text numberOfLines={3} style={[styles.name, { fontWeight: "bold", marginTop: 5 }]}>{'Visibility:'}</Text>
                    <Text numberOfLines={3} style={[styles.name, { fontWeight: "bold", marginTop: 5 }]}>{'Temperature:'}</Text>

                </View>

                <View style={{ flex: 1 }} >

                    <Text numberOfLines={2} style={[styles.name, { marginTop: 5 }]}>{props?.item?.time}</Text>
                    <Text numberOfLines={2} style={[styles.name, { marginTop: 5 }]}>{props?.item?.values?.humidity}</Text>
                    <Text numberOfLines={3} style={[styles.name, { marginTop: 5 }]}>{props?.item?.values?.visibility}</Text>
                    <Text numberOfLines={3} style={[styles.name, { marginTop: 5 }]}>{props?.item?.values?.temperature}</Text>

                </View>

            </View>



            <Text style={{ backgroundColor: Colors.light_gray_back, height: 2, marginTop: 20 }} />
        </Pressable>
    );
    const RenderWeather = () => {
        return <View style={{ marginHorizontal: 20 }}>
            <>
                <View style={styles.row_container}>
                    <Text style={styles.txt_left}>{'Location'}</Text>
                    <Text style={styles.txt_right}>{weather?.[0]?.location?.name}</Text>
                </View>
                <Text style={{ backgroundColor: Colors.light_gray_back, height: 2, marginTop: 0 }} />
            </>
            <View style={{ backgroundColor: Colors.status_bar, height: 50, borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                <Text
                    onPress={() => setSelected(1)}

                    style={{ flex: 1, height: 46, fontSize: 20, textAlignVertical: 'center', marginHorizontal: 2, borderRadius: 5, textAlign: 'center', color: 'black', fontWeight: 'bold', backgroundColor: selected == 1 ? 'white' : Colors.status_bar }}>{'Hourly'}</Text>
                <Text
                    onPress={() => setSelected(2)}
                    style={{ flex: 1, height: 46, fontSize: 20, textAlignVertical: 'center', marginHorizontal: 2, borderRadius: 5, textAlign: 'center', color: 'black', fontWeight: 'bold', backgroundColor: selected == 2 ? 'white' : Colors.status_bar }}>{'Daily'}</Text>
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={selected == 1 ? weather?.[0]?.timelines?.hourly : weather?.[0]?.timelines?.daily}
                style={styles.flatlist}
                renderItem={({ item }) => <RowWeatherDetails item={item} />} />

        </View>
    }
    const onPress = (index) => {
        setIndex(index)
        setNews([]);
        setEvents([]);
        setVideos([]);
        setWeather([]);
        setType('');
        setLocation('');
        setView(1)
    }
    
    useEffect(() => {
        const requestLocationPermission = async () => {
          if (Platform.OS === 'ios') {
            Geolocation.getCurrentPosition(info => setLatLngs(info));
            
          } else {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                  title: 'Location Access Required',
                  message: 'This App needs to Access your location',
                },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                //showToast('Permission Granted')

                Geolocation.getCurrentPosition(info => setLatLngs(info));
              } else {
              // showToast('Permission Denied')
               Geolocation.getCurrentPosition(info => setLatLngs(info));

              }
            } catch (err) {
              console.warn(err);
            }
          }
        };
        requestLocationPermission();
       
       
      }, []);

    // getting Data From sever


    useEffect(() => {

        switch (index) {
            case 1:
                setTitle('News')
                if (longitude) {
                    _getNews();
                }

                break;
            case 2:
                setTitle('Events')
                break;
            case 3:
                setTitle('Videos')
                break;
            case 4:
                setTitle('Weather')
                break;
        }
    }, [longitude, index])

    // Getting news
    const _getNews = async () => {

        const data = '?max-sentiment=10&location-filter=' + latitude + ',' + longitude + ',100&sort=publish-time&sort-direction=desc'
        const response = await getNews(data);
        if (response) {
            setNews(response?.data?.data)
        }
    }
    // Getting Events
    const _getEvents = async () => {
        const data = '?q=' + type + '&gl=usa&hl=en&location_requested=' + location
        const response = await getEvents(data);
        if (response) {
            setEvents(response?.data?.data)
        }
    }
    // Getting Videos
    const _getVideos = async () => {
        const data = type;
        const response = await getVideos(data);
        if (response) {
            setVideos(response?.data?.data)
        }
    }
    // Getting Weather
    const _getWeatherDetails = async () => {
        const response = await getWaetherDetails(location);
        if (response) {
            setWeather(response?.data?.data)
        }
    }
    const moveToLogin = () => {
        showToast("Logout")
        removeUserToken();
        props?.navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    { name: 'Splash' },
                ],
            })
        );
    }
    const RenderDataLoading = () => {
        return <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.text_register}>{'Looking for Data...'}</Text>

            <ActivityIndicator />
        </View>
    }
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', marginHorizontal: 20 }}>

                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', }}>
                    <Image resizeMode={'contain'} style={styles.img} source={ImagesIcons._logo} />
                    <Text style={[styles.text_register, { marginLeft: 5, fontSize: 20, marginBottom: 5, fontWeight: 'bold' }]}>{title}</Text>

                </View>

                {index != 1 ? <Pressable
                    style={{ height: 30, width: 50, justifyContent: 'center', alignItems: 'flex-end' }}

                    onPress={() => setView(1)}>
                    <Image resizeMode={'contain'} style={{ height: 20, width: 20, tintColor: Colors.status_bar }} source={ImagesIcons.filter} />
                </Pressable> : <></>}

                <Pressable
                    style={{ height: 30, width: 50, justifyContent: 'center', alignItems: 'flex-end' }}

                    onPress={() => moveToLogin()}>
                    <Image resizeMode={'contain'} style={{ height: 20, width: 20, tintColor: Colors.status_bar }} source={ImagesIcons.logout} />
                </Pressable>
            </View>


            <View style={{ flex: 1, }}>


                {index == 1 ?
                    news.length > 0 ? <FlatList
                        showsVerticalScrollIndicator={false}
                        data={news}
                        style={styles.flatlist}
                        renderItem={({ item }) => <Row item={item} />}
                    /> : <RenderDataLoading /> : index == 2 ?
                        viewType == 1 ?
                            <View style={{ marginHorizontal: 20 }}>

                                <View>
                                    <Text style={styles.text_hint}>Type</Text>
                                    <TextInput
                                        returnKeyType="next"
                                        style={styles.input}
                                        onChangeText={setType}
                                        value={type}
                                        placeholder="Enter key type"
                                        placeholderTextColor={Colors.placeholder_gray}
                                    />
                                    <Text style={styles.text_hint}>Location</Text>
                                    <TextInput
                                        returnKeyType="done"
                                        style={styles.input}
                                        onChangeText={setLocation}
                                        value={location}
                                        placeholder="Enter location"
                                        placeholderTextColor={Colors.placeholder_gray}
                                    />

                                </View>
                                <TouchableNativeFeedback onPress={() => fireEventApi()}>
                                    <View style={styles.register}>

                                        <Text style={styles.text_login}>{`Submit`}</Text>
                                    </View>
                                </TouchableNativeFeedback>
                            </View>
                            :
                            events.length > 0 ? <FlatList
                                showsVerticalScrollIndicator={false}
                                data={events}
                                style={styles.flatlist}
                                renderItem={({ item }) => <RowEvents item={item} />}
                            /> : <RenderDataLoading /> : index == 3 ?

                            viewType == 1 ?
                                <View style={{ marginHorizontal: 20 }}>
                                    <View>
                                        <Text style={styles.text_hint}>Type</Text>
                                        <TextInput
                                            returnKeyType="next"
                                            style={styles.input}
                                            onChangeText={setType}
                                            value={type}
                                            placeholder="Enter key type"
                                            placeholderTextColor={Colors.placeholder_gray}
                                        />

                                    </View>
                                    <TouchableNativeFeedback onPress={() => fireApi()}>
                                        <View style={styles.register}>

                                            <Text style={styles.text_login}>{`Submit`}</Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                                :
                                videos.length > 0 ? <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={videos}
                                    style={styles.flatlist}
                                    renderItem={({ item }) => <RowVideos item={item} />}

                                /> : <RenderDataLoading /> : index == 4 ?
                                <View style={{ flex: 1 }}>
                                    {viewType == 1 ?

                                        <View style={{ marginHorizontal: 20 }}>
                                            <View>
                                                <Text style={styles.text_hint}>Location</Text>
                                                <TextInput
                                                    returnKeyType="done"
                                                    style={styles.input}
                                                    onChangeText={setLocation}
                                                    value={location}
                                                    placeholder="Enter location"
                                                    placeholderTextColor={Colors.placeholder_gray}
                                                />

                                            </View>
                                            <TouchableNativeFeedback onPress={() => fireApi()}>
                                                <View style={styles.register}>

                                                    <Text style={styles.text_login}>{`Submit`}</Text>
                                                </View>
                                            </TouchableNativeFeedback>
                                        </View>

                                        :
                                        weather.length > 0 ? <RenderWeather /> : <RenderDataLoading />}
                                </View> : <></>
                }
            </View>


            <View style={{ height: 80, alignItems: 'center', backgroundColor: Colors.status_bar, flexDirection: 'row' }}>

                <Pressable
                    onPress={() => onPress(1)}
                    style={[styles.pressable, { backgroundColor: index == 1 ? Colors.white : Colors.status_bar }]}>
                    <Image resizeMode={'contain'} style={styles.img_bottom} source={ImagesIcons.news} />
                    <Text style={styles.text_register}>{'News'}</Text>

                </Pressable>

                <Pressable
                    onPress={() => onPress(2)}
                    style={[styles.pressable, { backgroundColor: index == 2 ? Colors.white : Colors.status_bar }]}>
                    <Image resizeMode={'contain'} style={styles.img_bottom} source={ImagesIcons.event} />
                    <Text style={styles.text_register}>{'Events'}</Text>

                </Pressable>


                <Pressable
                    onPress={() => onPress(3)}
                    style={[styles.pressable, { backgroundColor: index == 3 ? Colors.white : Colors.status_bar }]}>
                    <Image resizeMode={'contain'} style={styles.img_bottom} source={ImagesIcons.video} />
                    <Text style={styles.text_register}>{'Video'}</Text>

                </Pressable>


                <Pressable
                    onPress={() => onPress(4)}
                    style={[styles.pressable, { backgroundColor: index == 4 ? Colors.white : Colors.status_bar }]}>
                    <Image resizeMode={'contain'} style={styles.img_bottom} source={ImagesIcons.weather} />
                    <Text style={styles.text_register}>{'Weather'}</Text>

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
        marginHorizontal: 2,
        borderRadius: 2,
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