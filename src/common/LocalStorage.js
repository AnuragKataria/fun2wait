import AsyncStorage from "@react-native-async-storage/async-storage";
import Snackbar from "react-native-snackbar";


export const showToast =(msg)=>{
    Snackbar.show({
        text: msg,
        duration: Snackbar.LENGTH_SHORT,
      });
}


export const isWelcomeScreenComplete = async () => {
    var isCompleted = await AsyncStorage.getItem('isCompleted');
    if (isCompleted == undefined || isCompleted == null) {
        isCompleted = 'false';
    }
    return isCompleted;

}
export const setWelcomeScreenComplete = (isCompleted) => {
    AsyncStorage.setItem('isCompleted', isCompleted);
}


export const isLoggedIn = async () => {
    var isLoggedIn = await AsyncStorage.getItem('isLoggedIn');
    if (isLoggedIn == undefined || isLoggedIn == null) {
        isLoggedIn = 'false';
    }
    return isLoggedIn;

}
export const setLoggedIn = (isLoggedIn) => {
    AsyncStorage.setItem('isLoggedIn', isLoggedIn);
}


export const getUserToken = async () => {
    var token = await AsyncStorage.getItem('TOKEN');
    if (token == undefined || token == null) {
        token = 'false';
    }
    return token;

}
export const setUserToken = (token) => {
    AsyncStorage.setItem('TOKEN', token);
}

export const getLoginObject = async () => {
    var login = await AsyncStorage.getItem('LOGIN');

    return login;

}
export const setLoginObject = (login) => {
    AsyncStorage.setItem('LOGIN', JSON.stringify(login));

}
export const removeLoginObject = () => {
    AsyncStorage.removeItem('LOGIN');

}
export const removeUserToken = () => {
    AsyncStorage.removeItem('TOKEN');
}
