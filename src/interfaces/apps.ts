import { Dictionary } from 'lodash'

export interface AppModel {
    id: string
    name: string
    created: string
    logo: string
}

export interface UserModel {
    id: string
    name: string
    email: string
    avatar: string
}

export interface AppsState {
    apps: Dictionary<AppModel>
    users: Dictionary<UserModel[]>
    appBuffers: Dictionary<AppModel>
}
