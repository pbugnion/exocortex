
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history';
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import appSagas from './actions'

const initialState = {
    receivedPosts: false,
    posts: null
}

const reducer = (state = initialState, action) => {
    if (action.type === 'RECEIVED_POST_LIST') {
	return {...state, posts: action.files, receivedPosts: true}
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

