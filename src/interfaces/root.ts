import { AppState } from './app'
import { AuthState } from './auth'
import { AppsState } from './apps'

export interface RootState {
    app: AppState
    apps: AppsState
    auth: AuthState
}

export interface NoopAction {
    type: 'NOOP'
}
