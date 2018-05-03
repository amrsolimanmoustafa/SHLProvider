import {
    UPDATE_LOCATON_SUBMIT_FAILED,
    UPDATE_LOCATON_SUBMIT_SUCESS,
    UPDATE_LOCATON_SUBMIT_RELOAD,
    UPDATE_LOCATON_SUBMIT_STARTED,

    UPDATE_ACTIVE_SUBMIT_FAILED,
    UPDATE_ACTIVE_SUBMIT_SUCESS,
    UPDATE_ACTIVE_SUBMIT_RELOAD,
    UPDATE_ACTIVE_SUBMIT_STARTED,
} from '../actions/types';

const INIT_STATE = {
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
        default:
            return state;
    }
};