import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableNativeFeedback,
    View,
} from 'react-native';

import { Colors } from '../common/Colors';
import { Logo } from '../common/Logo';
import { ImagesIcons } from '../common/ImagesIcons';
import { login, registeration } from '../axios/ServerCall';
import { jwtDecode } from "jwt-decode";
import { setLoginObject, setUserToken, showToast } from '../common/LocalStorage';


const Register = (props) => {
    const [email, onChangeEmail] = useState(null);
    const [password, onChangePassword] = useState(null);
    const [firstName, onChangeFirstname] = useState(null);
    const [lastName, onChangeLastname] = useState(null);
    const [loading, setLoading] = useState(false);

    const moveToOnBoard = async () => {

    }
    useEffect(() => {
        setTimeout(function () {
            moveToOnBoard();
        }, 2000);
    }, []);




    const _register = async () => {

        if (!firstName) {
            showToast('Please enter First Name');
        } else if (!lastName) {
            showToast('Please enter last Name');
        }
        else if (!email) {
            showToast('Please enter email');
        } else if (!password) {
            showToast('Please enter password');
        } else if (password.length < 6) {
            showToast('password lenght should be 6');
        } else {
            const payload = {
                firstName: firstName,
                email: email,
                lastName: lastName,
                password: password,
            }

            setLoading(true)
            // STart Registeration 
            const response = await registeration(payload);
            if (response) {
                showToast('Success!! Please Login')
                props?.navigation?.navigate('Login')
            }
        }


    }


    return (
        <View style={styles.container}>

            <View style={{ height: 150, justifyContent: 'center' }} >
                <Image resizeMode={'contain'} style={styles.img} source={ImagesIcons._logo} />
                <Logo style={{ alignSelf: 'center' }} />

            </View>
            <View style={{ flex: 1, }}>
                <Text style={styles.text}>Register</Text>

                <View style={styles.view_inputs}>

                    <>
                        <Text style={styles.text_hint}>First name</Text>


                        <TextInput
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={onChangeFirstname}
                            value={firstName}
                            placeholder="Enter your First name"
                            placeholderTextColor={Colors.placeholder_gray}
                        />
                    </>

                    <>
                        <Text style={styles.text_hint}>Last name</Text>


                        <TextInput
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={onChangeLastname}
                            value={lastName}
                            placeholder="Enter your Last name"
                            placeholderTextColor={Colors.placeholder_gray}
                        />

                    </>

                    <>
                        <Text style={styles.text_hint}>Email</Text>


                        <TextInput
                            returnKeyType="next"
                            style={styles.input}
                            onChangeText={onChangeEmail}
                            value={email}
                            placeholder="Enter your Email ID"
                            placeholderTextColor={Colors.placeholder_gray}
                            keyboardType="email-address"
                        />
                    </>
                    <>

                        <Text style={styles.text_hint}>Password</Text>


                        <TextInput
                            returnKeyType="done"
                            style={styles.input}
                            onChangeText={onChangePassword}
                            value={password}
                            placeholder="Enter your Password"
                            placeholderTextColor={Colors.placeholder_gray}
                            secureTextEntry={true}
                        />
                    </>

                </View>


                <TouchableNativeFeedback onPress={() => _register()}>
                    <View style={styles.register}>

                        {loading ? <ActivityIndicator
                            color={Colors.white}

                        /> : <Text style={styles.text_register}>{`Register`}</Text>}
                    </View>
                </TouchableNativeFeedback>


                <TouchableNativeFeedback onPress={() => props?.navigation.replace('Login')}>
                    <View >
                        <Text style={styles.text_login}>{`Already have an account? Login`}</Text>
                    </View>
                </TouchableNativeFeedback>

            </View>
        </View>


    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: Colors.white,
    },
    text: {
        fontFamily: 'DMSans-Bold',
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10,

        color: 'black',
        alignSelf: 'center',
    },

    img: {
        height: 80,
        width: 80,
        alignSelf: 'center'
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
        color: Colors.white,

    },
    text_login: {
        fontFamily: 'DMSans-Bold',
        fontSize: 15,
        marginTop: 15,
        textAlign: 'center',
        color: Colors.black,

    },
});

export default Register;