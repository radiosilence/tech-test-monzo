import { AuthState } from '../interfaces'
import {
    AuthAction,
    AUTH_AUTHENTICATED,
    AUTH_LOGOUT,
    AUTH_UPDATE_FORM,
    AUTH_INITIALIZE,
} from '../actions'

const initialState = {
    initialized: false,
    form: {
        email: 'mondo@example.com',
        password: 'hunter2',
        submitted: false,
        dirty: false,
    },
}

export default (state: AuthState = initialState, action: AuthAction) => {
    switch (action.type) {
        case AUTH_AUTHENTICATED:
            return {
                ...state,
                email: action.email,
                expiry: action.expiry,
                token: action.token,
            }
        case AUTH_INITIALIZE:
            return {
                ...state,
                initialized: true,
            }
        case AUTH_LOGOUT:
            return {
                ...initialState,
                initialized: true,
            }
        case AUTH_UPDATE_FORM:
            return {
                ...state,
                form: action.form,
            }
    }
    return state
}
