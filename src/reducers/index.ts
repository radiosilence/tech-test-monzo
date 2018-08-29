import app from './app'
import apps from './apps'
import auth from './auth'
import { combineReducers } from 'redux'

export default combineReducers({
    app,
    apps,
    auth,
})
