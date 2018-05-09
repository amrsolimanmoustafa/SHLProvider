import {combineReducers } from 'redux'
import mainReducer from './mainReducer'
import authReducer from './authReducer'
import updateComponentsStateReducer from './UpdateComponentsStateReducer/updateComponentsStateReducer'

export default combineReducers({
    main: mainReducer,
    auth:authReducer,
    compState:updateComponentsStateReducer
})
