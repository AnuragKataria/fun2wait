import { FlatList, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import { Colors } from "../../common/Colors";
import { firebase } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { Constants } from "../../axios/Constants";
import { getLoginObject, showToast } from "../../common/LocalStorage";
import { useIsFocused } from "@react-navigation/native";

const AlarmList = (props) => {

    const [alarmList, setAlarmList] = useState()
    const [alaramCount, setAlarmCount] = useState(0)
    const [musicCount, setMusicCount] = useState(0)
    const [musicList, setMusicList] = useState()

    const isFocus = useIsFocused();

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

    const ItemView = (params) => {
        return <View
            style={[styles.item, { flexDirection: 'row' , marginHorizontal:10, marginTop:10 }]}
        >
            <View style={{ flex: 1 }}>
                <Text style={[styles.txt , {fontSize:25}]}>{params?.item?.date}</Text>
                <Text style={[styles.txt , {fontSize:20}]}>{params?.item?.music}</Text>
                <Text style={[styles.txt , {marginTop:5}]}>{'Repeated Alarm: ' + (params?.item?.isRepeatAlarm == true ? 'Yes': 'No')}</Text>

            </View>

            <View style={{ }}>
                <Text style={[styles.txt , {fontSize:20}]}>{params?.item?.name}</Text>
                <Text style={[styles.txt , {fontSize:30}]}>{params?.item?.time}</Text>
            </View>


        </View>
    }

    useEffect(() => {
        const getData = async () => {
            const user = await getLoginObject();
            const uid = JSON.parse(user);
            readDataFromFirestore(Constants.collection, JSON.parse(uid)?.user?.uid)
            readDataFromFirestoreForMusic(Constants.music_collection, JSON.parse(uid)?.user?.uid)
        }
        if (isFocus) {
            getData();
        }

    }, [isFocus])

    const readDataFromFirestore = async (collection, docId) => {
        try {
            const ref = firebase.firestore().collection(collection).doc(docId)
            const response = await ref.get()
            if (!response?._data) {
                setAlarmCount(0)
                setAlarmList([])
            } else {
                setAlarmList(Object.values(response?._data))
                setAlarmCount(1)
            }
            return response
        } catch (error) {
            return error
        }
    }
    const moveToCreateAlarm = () => {
        if(musicCount==0){
            showToast('Please upload Music files first to create alarm')
        }else{
            props?.props?.navigation?.navigate('CreateAlarm', { 'count': alaramCount, 'musicList': musicList })
        }

    }
    const CreateAlarmButton = () => {
        return <TouchableNativeFeedback onPress={() => moveToCreateAlarm()}>
            <View style={styles.register}>
                <Text style={styles.text_login}>{`Create Alarm`}</Text>
            </View>
        </TouchableNativeFeedback>
    }

    const readDataFromFirestoreForMusic = async (collection, docId) => {
        try {
            const ref = firebase.firestore().collection(collection).doc(docId)
            const response = await ref.get()
            if (!response?._data) {
                setMusicCount(0)
                setMusicList([])
            } else {
                setMusicList(response?._data)
                setMusicCount(1)
            }
            return response
        } catch (error) {
            return error
        }
    }

    return <View style={styles.container}>
        <FlatList
            data={alarmList}
            style={{marginTop:20}}
            renderItem={({ item, index }) =>
                <ItemView item={item} index={index} />}
            ItemSeparatorComponent={this.renderSeparator}
        />


        <CreateAlarmButton />

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
        
        fontSize: 18,
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
export default AlarmList;