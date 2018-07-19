
import React, { Component } from 'react'

import PostView from './PostView'

class PostPage extends Component {
    render() {
	const { postPath, isLoaded, post } = this.props
	return (
	    <div>
	      <header className="toolbar toolbar-header toolbar-borderless">
		<h1 className="title">{postPath}</h1>
		<div className="toolbar-actions">
		  <div className="button-group">
		    <button className="btn btn-default" onClick={this.props.onNavigateHome}>
		      <span className="icon icon-home"></span>
		    </button>
		  </div>
		</div>
	      </header>
	      <div className="window-content">
		<PostView postPath={postPath} isLoaded={isLoaded} post={post} />
	      </div>
	    </div>
	)
    }
}

export default PostPage
