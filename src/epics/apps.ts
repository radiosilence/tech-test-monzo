import { keyBy, Dictionary } from 'lodash'
import { ActionsObservable, ofType, combineEpics } from 'redux-observable'
import { RxHttpSuccessAction, RxHttpAction } from 'redux-rx-http'
import {
    APPS_FETCH,
    appsSet,
    setLoading,
    APP_FETCH_USERS,
    appAppendUsers,
    APP_SAVE,
    appCancelUpdating,
} from '../actions'
import { map, mapTo } from 'rxjs/operators'
import { AppModel, UserModel } from '../interfaces'

// Apps get
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

// App save
const appSaveRequestEpic = (action$: ActionsObservable<RxHttpAction>) =>
    action$.pipe(
        ofType(APP_SAVE.REQUEST),
        map((action) => setLoading(`app:${(action.args as any).id}`, true)),
    )

const appSaveSuccessEpic = (
    action$: ActionsObservable<RxHttpSuccessAction<{ app: AppModel }>>,
) =>
    action$.pipe(
        ofType(APP_SAVE.SUCCESS),
        map(({ result: { app } }) =>
            appsSet({
                [app.id]: app,
            }),
        ),
    )

const appSaveClearBuffer = (
    action$: ActionsObservable<RxHttpSuccessAction<{ app: AppModel }>>,
) =>
    action$.pipe(
        ofType(APP_SAVE.SUCCESS),
        map(({ result: { app } }) => appCancelUpdating(app.id)),
    )

const appSaveFinallyEpic = (action$: ActionsObservable<RxHttpAction>) =>
    action$.pipe(
        ofType(APP_SAVE.FINALLY),
        map((action) => setLoading(`app:${(action.args as any).id}`, false)),
    )

// App users
const appUsersFetchRequestEpic = (action$: ActionsObservable<RxHttpAction>) =>
    action$.pipe(
        ofType(APP_FETCH_USERS.REQUEST),
        map((action) => setLoading(`users:${(action.args as any).id}`, true)),
    )

const appUsersFetchSuccessEpic = (
    action$: ActionsObservable<RxHttpSuccessAction<{ users: UserModel[] }>>,
) =>
    action$.pipe(
        ofType(APP_FETCH_USERS.SUCCESS),
        map(({ result: { users }, args }) =>
            appAppendUsers((args as Dictionary<string>).id, users),
        ),
    )

const appUsersFetchFinallyEpic = (action$: ActionsObservable<RxHttpAction>) =>
    action$.pipe(
        ofType(APP_FETCH_USERS.FINALLY),
        map((action) => setLoading(`users:${(action.args as any).id}`, false)),
    )

export const appsEpics = combineEpics(
    appsFetchRequestEpic,
    appsFetchSuccessEpic,
    appsFetchFinallyEpic,
    appSaveRequestEpic,
    appSaveSuccessEpic,
    appSaveFinallyEpic,
    appSaveClearBuffer,
    appUsersFetchRequestEpic,
    appUsersFetchSuccessEpic,
    appUsersFetchFinallyEpic,
)
