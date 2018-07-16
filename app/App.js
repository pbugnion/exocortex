
import React, { Component } from 'react'

import Routes from './routes';

class App extends Component {
    componentDidMount() {
	this.props.onAppStart()
    }

    render() {
	return (
	    <div className='window'>
	      <div className='window-content'>
		<Routes />
	      </div>
	    </div>
	);
    }
}

export default App;
