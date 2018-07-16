
import React, { Component } from 'react'
import { Provider } from 'react-redux';

import { store } from './store'

// import MarkdownViewer from './MarkdownViewer'
import PostSelector from './contents/PostSelector'

import 'photonkit/dist/css/photon.css'

class App extends Component {
    render() {
	return (
	    <Provider store={store}>
	      <div className='window'>
		<div className='window-content'>
		  <PostSelector />
		</div>
	      </div>
	    </Provider>
	);
    }
}

export default App;
