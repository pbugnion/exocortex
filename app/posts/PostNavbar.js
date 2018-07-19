
import React, { Component } from 'react'

class PostNavbar extends Component {
    render() {
	const { postPath, onNavigateHome } = this.props
	return (
	    <header className="toolbar toolbar-header">
	      <h1 className="title">{postPath}</h1>
	      <div className="toolbar-actions">
		<div className="button-group">
		  <button
		    className="btn btn-default"
		    onClick={onNavigateHome} >
		    <span className="icon icon-home"></span>
		  </button>
		</div>
	      </div>
	    </header>
	)
    }
}

export default PostNavbar
