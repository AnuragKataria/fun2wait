import { FlatList, Image, Pressable, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Colors } from "../../common/Colors";
import { firebase } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { Constants } from "../../axios/Constants";
import { getLoginObject } from "../../common/LocalStorage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { ImagesIcons } from "../../common/ImagesIcons";
import SoundPlayer from 'react-native-sound-player'

const MusicList = (props) => {
    const [musicList, setMusicList] = useState()
    const [musicCount, setMusicCount] = useState(0)
    const [isPlaying, setPlaying] = useState(false)
    const isFocus = useIsFocused();

    useEffect(() => {
        return (() => {
            setPlaying(false);
            SoundPlayer.pause();
            SoundPlayer.stop();
        })
    }, [])
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: Colors.light_gray_back,
                }}
            />
        );
    };
    const SoundPlay = (url) => {
        console.log(isPlaying, url)

        setTimeout(() => {
            if (isPlaying) {
                setPlaying(false);
                SoundPlayer.pause();
                SoundPlayer.stop();
            } else {
                setPlaying(true);
                SoundPlayer.playUrl(url)
            }
        }, 500);
     
    }
    const ItemView = (params) => {
        return <View
            style={[styles.item, { flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, marginTop: 10 }]}
        >
            <Text style={[styles.txt, { fontSize: 20, flex: 1 }]}>{params?.item?.name}</Text>

            <Pressable
                onPress={() => SoundPlay(params?.item?.url)}
            ><Image
                    resizeMode={'contain'}
                    source={isPlaying ? ImagesIcons.pause_button : ImagesIcons.play_button}
                    style={{ width: 30, height: 40 }} />
            </Pressable>

        </View>
    }
    useEffect(() => {
        const getData = async () => {
            const user = await getLoginObject();
            const uid = JSON.parse(user);
            readDataFromFirestore(Constants.music_collection, JSON.parse(uid)?.user?.uid)
        }


        if (isFocus) {
            getData();
        }

        setPlaying(false);
        SoundPlayer.pause();
        SoundPlayer.stop();




    }, [isFocus])
    const readDataFromFirestore = async (collection, docId) => {
        try {
            const ref = firebase.firestore().collection(collection).doc(docId)
            const response = await ref.get()
            if (!response?._data) {
                setMusicCount(0)
                setMusicList([])
            } else {
                setMusicList(Object.values(response?._data))
                setMusicCount(1)
            }
            return response
        } catch (error) {
            return error
        }
    }
    const moveToCreateAlarm = () => {
        props?.props?.navigation?.navigate('MusicUplaod', { 'count': musicCount })
    }
    const CreateMusicButton = () => {
        return <TouchableNativeFeedback onPress={() => moveToCreateAlarm()}>
            <View style={styles.register}>
                <Text style={styles.text_login}>{`Upload new music file`}</Text>
            </View>
        </TouchableNativeFeedback>
    }
    return <View style={styles.container}>
        <FlatList
            data={musicList}
            style={{ marginTop: 20 }}
            renderItem={({ item, index }) =>
                <ItemView item={item} index={index} />}
            ItemSeparatorComponent={this.renderSeparator}
        />
        <CreateMusicButton />
    </View>

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    txt: {
        color: Colors.black
    },
    item: {
        padding: 10,
        backgroundColor: Colors.light_gray_back,
        fontSize: 18,
        marginTop: 5,
    },
    register: {

        borderColor: Colors.status_bar,
        width: '80%',
        borderRadius: 2,
        borderWidth: 1,
        height: 50,
        margin: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.status_bar,
        alignSelf: 'center',
    },

    text_login: {
        fontFamily: 'DMSans-Bold',
        fontSize: 15,
        textAlign: 'center',
        color: Colors.white,

    },
})
export default MusicList;