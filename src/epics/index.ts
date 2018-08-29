import { combineEpics } from 'redux-observable'
import { appsEpics } from './apps'
import { authEpics } from './auth'
export default combineEpics(appsEpics, authEpics)
