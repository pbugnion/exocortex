
import React, { Component } from 'react'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router'

import Routes from './routes';

import { configureStore, history } from './store'

import 'photonkit/dist/css/photon.css'

const store = configureStore()

class App extends Component {
    render() {
	return (
	    <Provider store={store}>
	      <ConnectedRouter history={history}>
		<div className='window'>
		  <div className='window-content'>
		    <Routes />
		  </div>
		</div>
	      </ConnectedRouter>
	    </Provider>
	);
    }
}

export default App;
