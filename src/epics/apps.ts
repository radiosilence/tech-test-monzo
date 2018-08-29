import { keyBy } from 'lodash'
import { ActionsObservable, ofType, combineEpics } from 'redux-observable'
import { RxHttpSuccessAction, RxHttpAction } from 'redux-rx-http'
import { APPS_FETCH, appsSet, setLoading } from '../actions'
import { map, mapTo } from 'rxjs/operators'
import { AppModel } from '../interfaces'

const appsFetchRequestEpic = (action$: ActionsObservable<RxHttpAction>) =>
    action$.pipe(ofType(APPS_FETCH.REQUEST), mapTo(setLoading('apps', true)))

const appsFetchSuccessEpic = (
    action$: ActionsObservable<RxHttpSuccessAction<{ apps: AppModel[] }>>,
) =>
    action$.pipe(
        ofType(APPS_FETCH.SUCCESS),
        map(({ result: { apps } }) => appsSet(keyBy(apps, 'id'))),
    )

const appsFetchFinallyEpic = (action$: ActionsObservable<RxHttpAction>) =>
    action$.pipe(ofType(APPS_FETCH.FINALLY), mapTo(setLoading('apps', false)))

export const appsEpics = combineEpics(
    appsFetchRequestEpic,
    appsFetchSuccessEpic,
    appsFetchFinallyEpic,
)
