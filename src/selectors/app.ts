import { RootState } from '../interfaces'
export const getAppState = (state: RootState) => state.app
export const getLoading = (state: RootState, id: string) =>
    Boolean(getAppState(state).loading[id])
export const getVisible = (state: RootState, id: string) =>
    Boolean(getAppState(state).visible[id])
