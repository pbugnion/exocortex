
import React, { Component } from 'react'

import PostView from './PostView'

class PostPage extends Component {
    render() {
	const { postPath, isLoaded, post } = this.props
	return (
	    <div>
	      <header className="toolbar toolbar-header toolbar-borderless">
		<h1 className="title">{postPath}</h1>
	      </header>
	      <div className="window-content">
		<PostView postPath={postPath} isLoaded={isLoaded} post={post} />
	      </div>
	    </div>
	)
    }
}

export default PostPage
