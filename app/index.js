
import React, { Component } from 'react'
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'

import App from './AppContainer'
import { configureStore, history } from './store'

import 'photonkit/dist/css/photon.css'

const store = configureStore()

class Root extends Component {
    render() {
	return (
	    <Provider store={store}>
	      <ConnectedRouter history={history}>
		<App />
	      </ConnectedRouter>
	    </Provider>
	)
    }
}

render(
    <Root />,
    document.getElementById('root')
);
