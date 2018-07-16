
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { createHashHistory } from 'history';

const reducer = (state = {}, action) => state

export const history = createHashHistory()

const router = routerMiddleware(history);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export function configureStore() {
    return createStore(
	connectRouter(history)(reducer),
	composeEnhancers(applyMiddleware(router))
    )
}
