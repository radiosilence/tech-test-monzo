import { omit, cloneDeep } from 'lodash'
import { AppsState } from '../interfaces'
import {
    AppsAction,
    APPS_SET,
    APP_APPEND_USERS,
    APP_START_UPDATING,
    APP_CANCEL_UPDATING,
    APP_PATCH_BUFFER,
} from '../actions'

const initialState = {
    apps: {},
    users: {},
    appBuffers: {},
}

export default (state: AppsState = initialState, action: AppsAction) => {
    // TODO: Split these out into functions and write a nested update function
    switch (action.type) {
        case APPS_SET:
            return {
                ...state,
                apps: {
                    ...state.apps,
                    ...action.apps,
                },
            }
        case APP_APPEND_USERS:
            return {
                ...state,
                users: {
                    ...state.users,
                    [action.id]: [
                        ...(state.users[action.id] || []),
                        ...action.users,
                    ],
                },
            }
        case APP_START_UPDATING:
            return {
                ...state,
                appBuffers: {
                    ...state.appBuffers,
                    [action.id]: cloneDeep(state.apps[action.id]),
                },
            }
        case APP_CANCEL_UPDATING:
            return {
                ...state,
                appBuffers: omit(state.appBuffers, action.id),
            }
        case APP_PATCH_BUFFER:
            return {
                ...state,
                appBuffers: {
                    ...state.appBuffers,
                    [action.id]: {
                        ...state.appBuffers[action.id],
                        ...action.patch,
                    },
                },
            }
    }
    return state
}
