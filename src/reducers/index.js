import {combineReducers } from 'redux'
import commonServicesReducer from './commonServicesReducer'
export default combineReducers({
    commonServices: commonServicesReducer
})
