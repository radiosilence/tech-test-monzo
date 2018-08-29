import { Dictionary } from 'lodash'

export interface AppModel {
    id: string
    name: string
    created: string
    logo: string
}
export interface AppsState {
    apps: Dictionary<AppModel>
}
