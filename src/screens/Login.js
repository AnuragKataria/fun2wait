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
import { fetchCountryList, getNewsStocks, login } from '../axios/ServerCall';
import { jwtDecode } from "jwt-decode";
import { setLoginObject, setUserToken, showToast } from '../common/LocalStorage';
import auth, {FirebaseAuthTypes, firebase} from '@react-native-firebase/auth';


const Login = (props) => {
    // const [email, onChangeEmail] = useState('testschool@gmail.com');
    // const [password, onChangePassword] = useState('Abc@1234');

    const [email, onChangeEmail] = useState();
    const [password, onChangePassword] = useState();
    const [loading, setLoading] = useState(false);

    // Start Login Process
    const _login = async () => {
        
        if (!email) {
            showToast('Please enter email');
        } else if (!password) {
            showToast('Please enter password');
        } else if (password.length < 6) {
            showToast('password lenght should be 6');
        } else {
            if (!loading) {
                setLoading(true);

                await 
                firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(function(user) {
                setLoginObject(JSON.stringify(user))
                  console.log('Heloooooo' , user);
                  setLoading(false);
                props?.navigation?.navigate('Home')

                })
                .catch(function(err){
                    console.log('Heloooooo' , err);
                    setLoading(false);

                });
            } else {
                setLoading(false);

                console.log('Already Running')
            }

       }

    }

    return (
        <View style={styles.container}>

            <View style={{ height: 150, justifyContent: 'center' }} >
                {/* <Image resizeMode={'contain'} style={styles.img} source={ImagesIcons._logo} /> */}
                <Logo style={{ alignSelf: 'center' }} />

            </View>
            <View style={{ flex: 1, }}>
                <Text style={styles.text}>Login with your Email-ID</Text>

                <View style={styles.view_inputs}>

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

                </View>
                <TouchableNativeFeedback onPress={() => _login()}>
                    <View style={styles.register}>

                        {loading ? <ActivityIndicator
                            color={Colors.white}

                        /> : <Text style={styles.text_login}>{`Login`}</Text>}
                    </View>
                </TouchableNativeFeedback>


                {/* <TouchableNativeFeedback onPress={() => props?.navigation.replace('Register')}>
                    <View >
                        <Text style={styles.text_register}>{`Don't have an account? Register`}</Text>
                    </View>
                </TouchableNativeFeedback> */}


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
        tintColor: Colors.status_bar,
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
        marginTop: 15,
        fontFamily: 'DMSans-Bold',
        fontSize: 15,
        textAlign: 'center',
        color: Colors.black,

    },
    text_login: {
        fontFamily: 'DMSans-Bold',
        fontSize: 15,
        textAlign: 'center',
        color: Colors.white,

    },

});

export default Login;