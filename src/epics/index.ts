import { combineEpics } from 'redux-observable'
import { handleDeauthedEpic, handleLoginSuccessEpic } from './auth'
export default combineEpics(handleDeauthedEpic, handleLoginSuccessEpic)
