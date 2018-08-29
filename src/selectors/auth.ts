import { RootState } from '../interfaces'

export const getAuthState = (state: RootState) => state.auth

export const getAuthToken = (state: RootState) => getAuthState(state).token

export const getAuthExpiry = (state: RootState) => getAuthState(state).expiry

export const getAuthInitialized = (state: RootState) =>
    getAuthState(state).initialized

export const getAuthenticated = (state: RootState) =>
    getAuthInitialized(state) && (getAuthExpiry(state) || 0) > Date.now() / 1000

export const getEmail = (state: RootState) => getAuthState(state).email

export const getAuthForm = (state: RootState) => getAuthState(state).form
