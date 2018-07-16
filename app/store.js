
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history';
import createSagaMiddleware from 'redux-saga'

import appSagas from './actions'

const reducer = (state = {}, action) => state

export const history = createHashHistory()

const router = routerMiddleware(history);
const sagas = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore() {
    const store = createStore(
	connectRouter(history)(reducer),
	composeEnhancers(applyMiddleware(router, sagas))
    )
    sagas.run(appSagas)
    return store
}

