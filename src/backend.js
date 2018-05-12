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

    updateprovidertoken(id,data){
        console.log(`api/updateprovidertoken/${id}`)
        console.log(JSON.stringify(data))
        return axios.put(`api/updateprovidertoken/${id}`,
            JSON.stringify(data)
        )
        .then(function(response) {
            return response.data;
        })
        .catch(function(err) {
            console.log("Error : ", err);
        });
    },

    acceptOrder(id,data){
        console.log(`api/aceeptedorder/${id}`)
        console.log(JSON.stringify(data))
        return axios.put(`api/aceeptedorder/${id}`,
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