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

    CANCEL_ORDER_FETCH_FAILED,
    CANCEL_ORDER_FETCH_SUCESS,
    CANCEL_ORDER_FETCH_RELOAD,
    CANCEL_ORDER_FETCH_STARTED,
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
            let order = response.orders[0]
            if(response != undefined){
                AsyncStorage.multiSet([
                    ['orderId',order.order_id.toString()],
                    ['userId',response.user_id.toString()],
                    ['username',response.user_name],
                    ['email',response.email? response.email : ''],
                    ['phone',response.phone? response.phone : ''],
                    ['profile_pic',response.profile_pic? response.profile_pic : ''],
                    ['user_lat',order.user_lat? order.user_lat.toString() : '0'],
                    ['user_long',order.user_long? order.user_long.toString() : '0'],
                ])
                dispatch({
                    type: ACCEPT_ORDER_SUBMIT_SUCESS,
                    client: response
                })
            }else{
                dispatch({
                    type: ACCEPT_ORDER_SUBMIT_FAILED
                })
            }
        })
    }
}

export const getCancelResones = () => {
    return(dispatch) => {
        dispatch({
            type: CANCEL_ORDER_FETCH_STARTED
        })
        Backend.getCancelResones()
        .then(async (response) => {
            console.log(response)
            /*[
                {
                    "cancel_order_reasons_id": 1,
                    "cancel_order_reasons_ar": "لا أحد فى الموقع",
                    "cancel_order_reasons_en": "No one in the site",
                    "cancel_order_reasons_ur": "اس سائٹ میں کوئی بھی نہیں",
                    "created_at": null,
                    "updated_at": null
                },
                {
                    "cancel_order_reasons_id": 2,
                    "cancel_order_reasons_ar": "العميل يرفض الدفع",
                    "cancel_order_reasons_en": "Customer refuses to pay",
                    "cancel_order_reasons_ur": "کسٹمر ادا کرنے سے انکار",
                    "created_at": null,
                    "updated_at": null
                },
              
            ]*/
            if(response != undefined){
                dispatch({
                    type: CANCEL_ORDER_FETCH_SUCESS,
                    cancelReasones: response
                })
            }else{
                dispatch({
                    type: CANCEL_ORDER_FETCH_FAILED
                })
            }
        })
    }
}

export const cancelOrder = (order_id,reasonId,reasonText) => {
    return(dispatch) => {
        dispatch({
            type: ACCEPT_ORDER_SUBMIT_STARTED
        })
        let data = {
            cancel_order_reasons_id: reasonId,
            cancel_order_reasons_text: reasonText
        }            
        Backend.cancelOrder(order_id,data)
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

export const endOrder = (orderId) => {
    return(dispatch) => {
        dispatch({
            type: ACCEPT_ORDER_SUBMIT_STARTED
        })
        Backend.ordersuccess(orderId)
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
