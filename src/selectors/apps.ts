import { values, Dictionary } from 'lodash'

import { createSelector } from 'reselect'
import { RootState, AppModel } from '../interfaces'

export const getAppsState = (state: RootState) => state.apps
export const getApps = (state: RootState) => getAppsState(state).apps

export const getAppArr = createSelector(
    [getApps],
    (apps: Dictionary<AppModel>) => values(apps),
)
