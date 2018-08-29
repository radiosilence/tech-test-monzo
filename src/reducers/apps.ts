import { AppsState } from '../interfaces'
import { AppsAction, APPS_SET } from '../actions'

const initialState = {
    apps: {},
}

export default (state: AppsState = initialState, action: AppsAction) => {
    switch (action.type) {
        case APPS_SET:
            return {
                ...state,
                apps: action.apps,
            }
    }
    return state
}
