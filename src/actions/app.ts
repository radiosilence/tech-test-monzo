export const SET_LOADING = 'SET_LOADING'
export const SET_VISIBLE = 'SET_VISIBLE'

export interface SetLoadingAction {
    type: typeof SET_LOADING
    id: string
    loading: boolean
}

export interface SetVisibleAction {
    type: typeof SET_VISIBLE
    id: string
    visible: boolean
}

export type AppAction = SetLoadingAction | SetVisibleAction

export const setLoading = (id: string, loading: boolean): SetLoadingAction => ({
    type: SET_LOADING,
    id,
    loading,
})

export const setVisible = (id: string, visible: boolean): SetVisibleAction => ({
    type: SET_VISIBLE,
    id,
    visible,
})
