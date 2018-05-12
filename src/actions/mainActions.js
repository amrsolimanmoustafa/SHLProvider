import {
    UPDATE_LOCATON_SUBMIT_FAILED,
    UPDATE_LOCATON_SUBMIT_SUCESS,
    UPDATE_LOCATON_SUBMIT_RELOAD,
    UPDATE_LOCATON_SUBMIT_STARTED,

    UPDATE_ACTIVE_SUBMIT_FAILED,
    UPDATE_ACTIVE_SUBMIT_SUCESS,
    UPDATE_ACTIVE_SUBMIT_RELOAD,
    UPDATE_ACTIVE_SUBMIT_STARTED,

    ACCEPT_ORDER_SUBMIT_FAILED,
    ACCEPT_ORDER_SUBMIT_SUCESS,
    ACCEPT_ORDER_SUBMIT_RELOAD,
    ACCEPT_ORDER_SUBMIT_STARTED,
} from './types'
import { AsyncStorage } from 'react-native'
import Backend from '../backend';
import Toast from 'react-native-toast'

export const updateProvidorLocation = (data) => {
    return(dispatch) => {
        dispatch({
            type: UPDATE_LOCATON_SUBMIT_STARTED
        })
        Backend.updateProvidorLocation(3,data)
        .then(async (response) => {
            console.log(response)
            if(response != undefined){
                dispatch({
                    type: UPDATE_LOCATON_SUBMIT_SUCESS,
                })
            }else{
                dispatch({
                    type: UPDATE_LOCATON_SUBMIT_FAILED
                })
            }
        })
    }
}

export const updateProviderActive = (data) => {
    return(dispatch) => {
        dispatch({
            type: UPDATE_ACTIVE_SUBMIT_STARTED
        })
        Backend.updateProviderActive(3,data)
        .then(async (response) => {
            console.log(response)
            if(response != undefined){
                dispatch({
                    type: UPDATE_ACTIVE_SUBMIT_SUCESS,
                })
            }else{
                dispatch({
                    type: UPDATE_ACTIVE_SUBMIT_FAILED
                })
            }
        })
    }
}

export const acceptOrder = (orderId) => {
    return(dispatch) => {
        dispatch({
            type: ACCEPT_ORDER_SUBMIT_STARTED
        })
        let data = {
            "provider_id": 3
        }            
        Backend.acceptOrder(orderId,data)
        .then(async (response) => {
            console.log(response)
            if(response != undefined){
                dispatch({
                    type: ACCEPT_ORDER_SUBMIT_SUCESS,
                })
            }else{
                dispatch({
                    type: ACCEPT_ORDER_SUBMIT_FAILED
                })
            }
        })
    }
}
