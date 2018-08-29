import { AppState } from './app'
import { AuthState } from './auth'

export interface RootState {
    app: AppState
    auth: AuthState
}

export interface NoopAction {
    type: 'NOOP'
}
