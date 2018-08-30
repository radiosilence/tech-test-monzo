import { rxHttpGet, createRxHttpActionTypes, rxHttpPut } from 'redux-rx-http'
import { AppModel, UserModel } from '../interfaces'
import { Dictionary, omit } from 'lodash'

export const APPS_FETCH = createRxHttpActionTypes('APPS_FETCH')
export const APP_SAVE = createRxHttpActionTypes('APP_SAVE')
export const APP_FETCH_USERS = createRxHttpActionTypes('APP_FETCH_USERS')
export const APPS_SET = 'APPS_SET'
export const APP_APPEND_USERS = 'APP_APPEND_USERS'
export const APP_START_UPDATING = 'APP_START_UPDATING'
export const APP_CANCEL_UPDATING = 'APP_CANCEL_UPDATING'
export const APP_PATCH_BUFFER = 'APP_PATCH_BUFFER'

export interface AppsSetAction {
    type: typeof APPS_SET
    apps: Dictionary<AppModel>
}

export interface AppAppendUsersAction {
    type: typeof APP_APPEND_USERS
    id: string
    users: UserModel[]
}

export interface AppStartUpdatingAction {
    type: typeof APP_START_UPDATING
    id: string
}

export interface AppCancelUpdatingAction {
    type: typeof APP_CANCEL_UPDATING
    id: string
}

export interface AppPatchBufferAction {
    type: typeof APP_PATCH_BUFFER
    id: string
    patch: Partial<UserModel>
}

export type AppsAction =
    | AppsSetAction
    | AppAppendUsersAction
    | AppStartUpdatingAction
    | AppCancelUpdatingAction
    | AppPatchBufferAction

export const appsFetch = () => rxHttpGet('/apps', APPS_FETCH)

export const appsSet = (apps: Dictionary<AppModel>): AppsSetAction => ({
    type: APPS_SET,
    apps,
})

export const appStartUpdating = (id: string): AppStartUpdatingAction => ({
    type: APP_START_UPDATING,
    id,
})

export const appCancelUpdating = (id: string): AppCancelUpdatingAction => ({
    type: APP_CANCEL_UPDATING,
    id,
})

export const appPatchBuffer = (
    id: string,
    patch: Partial<UserModel>,
): AppPatchBufferAction => ({
    type: APP_PATCH_BUFFER,
    id,
    patch,
})

export const appAppendUsers = (
    id: string,
    users: UserModel[],
): AppAppendUsersAction => ({
    type: APP_APPEND_USERS,
    id,
    users,
})

export const appFetchUsers = (
    id: string,
    limit: number = 25,
    offset: number = 0,
) =>
    rxHttpGet(
        `/apps/${id}/users`,
        APP_FETCH_USERS,
        { limit, offset },
        {
            args: { id },
        },
    )

export const appSave = (id: string, app: AppModel) =>
    rxHttpPut(`/apps/${id}`, APP_SAVE, omit(app, ['id', 'created']), {
        args: { id },
    })
