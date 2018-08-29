import { createStore, applyMiddleware, compose } from 'redux'
import 'rxjs'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { createRxHttpEpic } from 'redux-rx-http'
import rootReducer from './reducers'
import rootEpic from './epics'
import { RootState } from './interfaces'
import { getAuthToken } from './selectors'

const rxHttpEpic = createRxHttpEpic((state: RootState) => ({
    baseUrl: 'https://guarded-thicket-22918.herokuapp.com',
    headers: {
        authorization: `${getAuthToken(state)}`,
        'content-type': 'application/json',
    },
}))
const epicMiddleware = createEpicMiddleware({
    dependencies: { fetch },
})

export default () => {
    const composeEnhancers =
        (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(epicMiddleware)),
    )
    epicMiddleware.run(combineEpics(rxHttpEpic, rootEpic))
    return store
}
