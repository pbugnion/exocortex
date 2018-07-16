
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history';
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import appSagas from './actions'

const reducer = (state = {}, action) => {
    if (action.type === 'RECEIVED_POST_LIST') {
	return {posts: action.files}
    }
    return state
}

export const history = createHashHistory()

const router = routerMiddleware(history);
const sagas = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore() {
    const store = createStore(
	connectRouter(history)(reducer),
	composeEnhancers(applyMiddleware(router, sagas, logger))
    )
    sagas.run(appSagas)
    return store
}

