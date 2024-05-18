import { ActivityIndicator, Pressable, StyleSheet, Switch, Text, TextInput, TouchableNativeFeedback, View } from "react-native";
import { Colors } from "../../common/Colors";
import { firebase } from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";
import { Logo } from "../../common/Logo";
import DatePicker from "react-native-date-picker";
import moment from 'moment'
import SelectDropdown from 'react-native-select-dropdown'
import { Constants } from "../../axios/Constants";
import { getLoginObject, showToast } from "../../common/LocalStorage";


const CreateAlarm = (props) => {
    const [date, setDate] = useState(new Date())
    const [dateToshow, setDateToShow] = useState()
    const [time, setTime] = useState(new Date().getTime())
    const [timeToshow, setTimeToShow] = useState()
    const [music, setMusicFile] = useState()
    const [musicIndex, setMusicIndex] = useState(-1)
    const [userData, setuserData] = useState()
    const [name, onChangeName] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const count = props?.route?.params?.count;
    const musicList = Object.values(props?.route?.params?.musicList);
    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    useEffect(() => {

        const getData = async () => {
            const user = await getLoginObject();
            const uid = JSON.parse(user);
            setuserData(uid)


        }
        getData();

    }, [])

    const writeDataToFirestore = async (collection) => {
        if (!name) {
            showToast('Please enter name')
        } else if (!dateToshow) {
            showToast('Please Select date')
        } else if (!timeToshow) {
            showToast('Please select time')
        } else if (!music) {
            showToast('Please select Music file')
        } else {

            console.log(musicList);
            var id = Math.floor(100000 + Math.random() * 900000)
            const data = {
                [makeid(10)]: {
                    'name': name,
                    'date': dateToshow,
                    'time': timeToshow,
                    'music_url': musicList[musicIndex]?.url,
                    'music_id': musicList[musicIndex]?.id,
                    'music': musicList[musicIndex]?.name,
                    'isRepeatAlarm': isEnabled,
                    'extension':  musicList[musicIndex]?.namewithextension,
                    'id': id
                }
            }
            setLoading(true)
            if (count == 0) {
                firebase
                    .firestore()
                    .collection(collection)
                    .doc(JSON.parse(userData)?.user?.uid)
                    .set(data)
                    .then((ref) => {
                        setLoading(false)
                        props?.navigation?.goBack()
                        showToast('Success')
                    })
                    .catch((error) => {
                        setLoading(false)
                        showToast(error + '')
                        return error
                    });
            } else {
                firebase
                    .firestore()
                    .collection(collection)
                    .doc(JSON.parse(userData)?.user?.uid)
                    .update(data)
                    .then((ref) => {
                        setLoading(false)
                        props?.navigation?.goBack()
                        showToast('Success')
                    })
                    .catch((error) => {
                        setLoading(false)
                        showToast(error + '')
                        return error
                    });
            }
        }



    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };


    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const onPress = () => {
        props?.navigation?.goBack()
    }
    return <View style={styles.container}>
        <Logo press={onPress} isBack={true} style={{ alignSelf: 'center', marginTop: 10 }} />

        <View style={{ flex: 1, paddingHorizontal: 20, marginTop: 20 }}>
            <TextInput
                returnKeyType="next"
                style={styles.input}
                onChangeText={onChangeName}
                value={name}
                placeholder="Enter Alarm Name"
                placeholderTextColor={Colors.placeholder_gray}
            />

            <Pressable onPress={() => { showDatePicker() }}
            >
                <TextInput
                    returnKeyType="next"
                    style={styles.input}
                    onChangeText={setDate}
                    value={dateToshow}
                    editable={false}
                    placeholder="Select Date"
                    placeholderTextColor={Colors.placeholder_gray}
                />
            </Pressable>
            <DatePicker
                modal
                open={isDatePickerVisible}
                date={date}
                mode={'date'}
                minimumDate={new Date()}
                onConfirm={(date) => {
                    hideDatePicker()
                    const NewDate = moment(date).format('DD-MM-YYYY')
                    console.log('DATE===', NewDate)
                    setDate(date)
                    setDateToShow(NewDate)
                }}
                onCancel={() => {
                    hideDatePicker()
                }}
            />

            <Pressable onPress={() => { showTimePicker() }}
            >
                <TextInput
                    returnKeyType="next"
                    style={styles.input}
                    onChangeText={setDate}
                    value={timeToshow}
                    editable={false}
                    placeholder="Select Time"
                    placeholderTextColor={Colors.placeholder_gray}
                />
            </Pressable>
            <DatePicker
                modal
                open={isTimePickerVisible}
                date={date}
                mode={'time'}
                minimumDate={new Date()}
                onConfirm={(time) => {
                    hideTimePicker()
                    const newTime = moment(time).format('hh:mm A')
                    console.log('DATE===', newTime)
                    setTime(time)
                    setTimeToShow(newTime)
                }}
                onCancel={() => {
                    hideTimePicker()
                }}
            />


            <SelectDropdown
                data={musicList}
                onSelect={(selectedItem, index) => {
                    setMusicIndex(index)
                    setMusicFile(selectedItem?.name)
                }}
                renderButton={(selectedItem, isOpened) => {
                    return (
                        <View style={styles.input}>

                            <Text style={[styles.text_login, { top: 5, textAlign: 'left', color: Colors.placeholder_gray }]}>
                                {(selectedItem && selectedItem.name) || 'Select Alarm Music'}
                            </Text>

                        </View>
                    );
                }}
                renderItem={(item, index, isSelected) => {
                    return (
                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                            <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                        </View>
                    );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
            />

            <View style={[styles.input, { flexDirection: 'row' }]} >
                <TextInput
                    returnKeyType="next"
                    onChangeText={setDate}
                    style={{ flex: 1 }}
                    editable={false}
                    placeholder="Repeat Alarm"
                    placeholderTextColor={Colors.placeholder_gray}
                />

                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>



            <TouchableNativeFeedback onPress={() => writeDataToFirestore(Constants.collection)}>
                <View style={styles.register}>

                    {loading ? <ActivityIndicator
                        color={Colors.white}

                    /> : <Text style={styles.text_login}>{`Create Music Alarm`}</Text>}
                </View>
            </TouchableNativeFeedback>


        </View>

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
        height: 44,
    },
    input: {
        height: 55,
        marginTop: 20,
        borderWidth: 1,
        padding: 10,
        fontFamily: 'DMSans-Regular',
        borderRadius: 2,
        color: Colors.black,
        borderColor: Colors.border_stroke,
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


    text_login: {
        fontFamily: 'DMSans-Bold',
        fontSize: 15,
        textAlign: 'center',
        color: Colors.white,

    },
    dropdownButtonStyle: {
        width: 200,
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },

})
export default CreateAlarm;