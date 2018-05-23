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
} from '../actions/types';

const INIT_STATE = {
    client: {},
    cancelResonesList: [],
    pageLoadingError: false,
    pageLoading: true,
    refreshing: false
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case UPDATE_LOCATON_SUBMIT_STARTED:
            return {...state, pageLoading: true, pageLoadingError : false};
        case UPDATE_LOCATON_SUBMIT_SUCESS:
            return {...state, pageLoading: false};
        case UPDATE_LOCATON_SUBMIT_FAILED:
            return {...state, pageLoadingError : true, pageLoading: false};
        case UPDATE_LOCATON_SUBMIT_RELOAD:
            return {...state, pageLoadingError : false, pageLoading: true};
        
        case UPDATE_ACTIVE_SUBMIT_STARTED:
            return {...state, pageLoading: true, pageLoadingError : false};
        case UPDATE_ACTIVE_SUBMIT_SUCESS:
            return {...state, pageLoading: false};
        case UPDATE_ACTIVE_SUBMIT_FAILED:
            return {...state, pageLoadingError : true, pageLoading: false};
        case UPDATE_ACTIVE_SUBMIT_RELOAD:
            return {...state, pageLoadingError : false, pageLoading: true};
        
        case ACCEPT_ORDER_SUBMIT_STARTED:
            return {...state, client: {},pageLoading: true, pageLoadingError : false};
        case ACCEPT_ORDER_SUBMIT_SUCESS:
            return {...state, client: action.client, pageLoading: false};
        case ACCEPT_ORDER_SUBMIT_FAILED:
            return {...state, pageLoadingError : true, pageLoading: false};
        case ACCEPT_ORDER_SUBMIT_RELOAD:
            return {...state, pageLoadingError : false, pageLoading: true};
        
        case CANCEL_ORDER_FETCH_STARTED:
            return {...state, cancelResonesList: [],pageLoading: true, pageLoadingError : false};
        case CANCEL_ORDER_FETCH_SUCESS:
            return {...state, cancelResonesList: action.cancelReasones, pageLoading: false};
        case CANCEL_ORDER_FETCH_FAILED:
            return {...state, pageLoadingError : true, pageLoading: false};
        case CANCEL_ORDER_FETCH_RELOAD:
            return {...state, pageLoadingError : false, pageLoading: true};
        default:
            return state;
    }
};