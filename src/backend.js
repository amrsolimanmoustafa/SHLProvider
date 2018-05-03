import { I18nManager, NetInfo, Platform,AsyncStorage } from 'react-native'
import * as axios from 'axios';
import Toast from 'react-native-toast';

axios.defaults.baseURL = 'http://admin.shl-app.com/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.get['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.put['Accept'] = 'application/json';
axios.defaults.headers.get['Accept'] = 'application/json';

function handleRequestError(){
    NetInfo.isConnected.fetch().then(isConnected => {
        if(!isConnected){
            Toast.show(strings.noConnection);
        }
    });
}

export default {
    registerProvider(data){
        /*let data={
            "user_name":"23زود خدمة1",
            "phone":"95558454",
            "license_number":"54545464",
            "vehicle_number":"54654654",
            "services_id":1,
            "sub_services_id":1,
            "personal_pic":"",//string b64
            "license_pic":"",//string b64
            "long":"",//float
            "lat":""//float
        }*/
        console.log(`api/registerprovider`)
        return axios.post(`api/registerprovider`,
            JSON.stringify(data)    
        )
        .then(function(response) {
            return response.data;
        })
        .catch(function(err) {
            console.log("Error : ", err);
        });
    },

    updateProvidorLocation(id,data){
        /*let data={
            "long":"",//float
            "lat":""//float
        }*/
        console.log(`api/updateprovidorlocation/${id}`)
        console.log(JSON.stringify(data))
        return axios.put(`api/updateprovidorlocation/${id}`,
            JSON.stringify(data)
        )
        .then(function(response) {
            return response.data;
        })
        .catch(function(err) {
            console.log("Error : ", err);
        });
    },

    updateProviderActive(id,data){
        /*let data={
            "active":1
        }*/
        console.log(`api/updateprovideractive/${id}`)
        console.log(JSON.stringify(data))
        return axios.put(`api/updateprovideractive/${id}`,
            JSON.stringify(data)
        )
        .then(function(response) {
            return response.data;
        })
        .catch(function(err) {
            console.log("Error : ", err);
        });
    },
}