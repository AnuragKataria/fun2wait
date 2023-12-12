
import axios from "axios";
import { ApiInterface } from "./ApiInterface";
import { getUserToken, removeLoginObject, removeUserToken, showToast } from "../common/LocalStorage";
import { CommonActions } from "@react-navigation/native";


// Start Registeration Process
export const login = async (payload) => {
    const response = await axios.post(ApiInterface.login_url, payload, {
        
            "accept": "application/json",
            "Content-type": 'application/json'
          
    })
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            handleError(error.response.status)
            console.log(error);
        });

    return response
};

// Start Registeration Process
export const registeration = async (payload) => {


    const response = await axios.post(ApiInterface.register_url, payload, {
        "accept": "application/json",
        "Content-type": 'application/json'
    })
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            handleError(error.response.status)
        });

        console.log(response?.data)
    return response
};
// GET NEWS
export const getNews = async (data) => {
    const token = await getUserToken();
    const response = await axios.get(ApiInterface.get_news+data, {
        headers: {
            'Authorization': 'Bearer ' + token
            
          }
    })
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            handleError(error.response.status)

        });

    return response
};

// GET NEWS
export const getVideos = async (data) => {
    const token = await getUserToken();
    console.log(ApiInterface.get_videos , token)
    const response = await axios.get(ApiInterface.get_videos + data, {
        headers: {
            'Authorization': 'Bearer ' + token
            
          }
    })
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            handleError(error.response.status)

        });

    return response
};
// GET EVENTS
export const getEvents = async (data) => {
    const token = await getUserToken();

    const response = await axios.get(ApiInterface.get_events+ data, {
        headers: {
            'Authorization': 'Bearer ' + token
          }
    })
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            handleError(error.response.status)
        });

    return response
};

// GET EVENTS
export const getWaetherDetails = async (data) => {
    const token = await getUserToken();
    const response = await axios.get(ApiInterface.get_weather + data, {
        headers: {
            'Authorization': 'Bearer ' + token
          }
    })
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            handleError(error.response.status)
        });

    return response
};



//ERROR Handle for 
const handleError = async (errorCode, navigation) => {

    switch (errorCode) {
        case 401:
            showToast('401 ERROR')   
            break;
        case 500:
            showToast('Server error 500')

            break;
        case 400:
            showToast('BAD request 400')
            break;
        case 409:
            showToast('user already registered')
            // Already register error
            break;
    }

}



