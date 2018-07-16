
import { createStore, applyMiddleware, compose } from 'redux'

const reducer = (state = {}, action) => state

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware())
)
