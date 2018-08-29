import { rxHttpGet, createRxHttpActionTypes } from 'redux-rx-http'
import { AppModel } from '../interfaces'
import { Dictionary } from 'lodash'

export const APPS_FETCH = createRxHttpActionTypes('APPS_FETCH')
export const APPS_SET = 'APPS_SET'

export interface AppsSetAction {
    type: typeof APPS_SET
    apps: Dictionary<AppModel>
}

export type AppsAction = AppsSetAction

export const appsFetch = () => rxHttpGet('/apps', APPS_FETCH)

export const appsSet = (apps: Dictionary<AppModel>): AppsSetAction => ({
    type: APPS_SET,
    apps,
})
