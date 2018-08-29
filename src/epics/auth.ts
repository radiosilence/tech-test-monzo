import {
    RxHttpGlobalErrorAction,
    RX_HTTP_ERROR,
    RxHttpSuccessAction,
} from 'redux-rx-http'

import { ActionsObservable, ofType, combineEpics } from 'redux-observable'
import { filter, mapTo, map } from 'rxjs/operators'
import { authLogout, AUTH_LOGIN, authAuthenticated } from '../actions'

const handleLoginSuccessEpic = (
    action$: ActionsObservable<RxHttpSuccessAction<{ accessToken: string }>>,
) =>
    action$.pipe(
        ofType(AUTH_LOGIN.SUCCESS),
        map(({ result: { accessToken } }) => {
            localStorage.setItem('accessToken', accessToken)
            return authAuthenticated(accessToken)
        }),
    )

const handleDeauthedEpic = (
    action$: ActionsObservable<RxHttpGlobalErrorAction>,
) =>
    action$.pipe(
        ofType(RX_HTTP_ERROR),
        filter((action) => action.error.response.status === 401),
        mapTo(authLogout()),
    )

export const authEpics = combineEpics(
    handleLoginSuccessEpic,
    handleDeauthedEpic,
)
