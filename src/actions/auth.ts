import { rxHttpPost, createRxHttpActionTypes } from 'redux-rx-http'
import * as jwt from 'jsonwebtoken'
import { NoopAction, AuthFormState } from '../interfaces'

export const AUTH_LOGIN = createRxHttpActionTypes('AUTH_LOGIN')
export const AUTH_LOGOUT = 'AUTH_LOGOUT'
export const AUTH_INITIALIZE = 'AUTH_INITIALIZE'
export const AUTH_UPDATE_FORM = 'AUTH_UPDATE_FORM'
export const AUTH_AUTHENTICATED = 'AUTH_AUTHENTICATED'

export interface AuthAuthenticatedAction {
    type: typeof AUTH_AUTHENTICATED
    expiry: number
    email: string
    token: string
}

export interface AuthLogoutAction {
    type: typeof AUTH_LOGOUT
}

export interface AuthInitializeAction {
    type: typeof AUTH_INITIALIZE
}

export interface AuthUpdateFormAction {
    type: typeof AUTH_UPDATE_FORM
    form: AuthFormState
}

export const authLogin = (email: string, password: string) =>
    rxHttpPost('/login', AUTH_LOGIN, { email, password, expiry: '10s' })

export const authAuthenticated = (
    token: string,
): AuthAuthenticatedAction | NoopAction => {
    const payload = jwt.decode(token)
    if (!payload || typeof payload === 'string') {
        return { type: 'NOOP' }
    }
    return {
        type: AUTH_AUTHENTICATED,
        expiry: payload.exp,
        email: payload.email,
        token,
    }
}

export const authLogout = (): AuthLogoutAction => ({
    type: AUTH_LOGOUT,
})

export const authInitialize = (): AuthInitializeAction => ({
    type: AUTH_INITIALIZE,
})

export const authUpdateForm = (form: AuthFormState): AuthUpdateFormAction => ({
    type: AUTH_UPDATE_FORM,
    form,
})

export type AuthAction =
    | AuthLogoutAction
    | AuthInitializeAction
    | AuthAuthenticatedAction
    | AuthUpdateFormAction
