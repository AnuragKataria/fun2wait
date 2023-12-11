import NetInfo from '@react-native-community/netinfo';
// import crypto from 'crypto'




export const validateEmail = (email) => {

    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};



export const validateMobile = (mobile) => {
    var reg = /^[0]?[789]\d{9}$/;
    return reg.test(mobile);
};



export const validatePassword  = (password) => {
    var re = /^.*(?=.{6,})(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&* "]).*$/;
    return (
        re.test(password) 
        
    );

};





