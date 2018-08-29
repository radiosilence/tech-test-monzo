import { AppState } from '../interfaces'
import { AppAction, SET_LOADING, SET_VISIBLE } from '../actions'

export const initialState = {
    loading: {},
    visible: {},
}

export default (state: AppState = initialState, action: AppAction) => {
    switch (action.type) {
        case SET_LOADING:
            return {
                ...state,
                loading: {
                    ...state.loading,
                    [action.id]: action.loading,
                },
            }
        case SET_VISIBLE:
            return {
                ...state,
                visible: {
                    ...state.visible,
                    [action.id]: action.visible,
                },
            }
    }
}
