import { keys, Dictionary } from 'lodash'

import { createSelector } from 'reselect'
import { RootState, AppModel } from '../interfaces'

export const getAppsState = (state: RootState) => state.apps
export const getApps = (state: RootState) => getAppsState(state).apps

export const getAppIds = createSelector(
    [getApps],
    (apps: Dictionary<AppModel>) => keys(apps),
)

export const getApp = (state: RootState, id: string) =>
    getAppsState(state).apps[id]
