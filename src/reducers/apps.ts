import { AppsState } from '../interfaces'
import { AppsAction, APPS_FETCH } from '../actions'

const initialState = {
    apps: {},
}

export default (state: AppsState = initialState, action: AppsAction) => {
    switch (action.type) {
        case APPS_FETCH.SUCCESS:
            return {
                ...state,
                apps: action.apps,
            }
    }
    return state
}
