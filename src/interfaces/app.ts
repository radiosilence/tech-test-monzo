import { Dictionary } from 'lodash'

export interface AppState {
    loading: Dictionary<boolean>
    visible: Dictionary<boolean>
}
