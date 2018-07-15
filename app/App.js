
import React, { Component } from 'react'

import MarkdownViewer from './MarkdownViewer'

import 'photonkit/dist/css/photon.css'

class App extends Component {
    render() {
	return (
	    <div className='window'>
	      <div className='window-content'>
		<MarkdownViewer />
	      </div>
	    </div>
	);
    }
}

export default App;
