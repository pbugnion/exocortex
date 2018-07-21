
import React, { Component } from 'react'

import PostNavbar from './PostNavbar'
import PostView from './PostView'

class PostPage extends Component {
    render() {
	const { postPath, isLoaded, post, onNavigateHome } = this.props
	return (
	    <div className="window">
	      <PostNavbar postPath={postPath} onNavigateHome={onNavigateHome} />
	      <div className="window-content">
		<PostView postPath={postPath} isLoaded={isLoaded} post={post} />
	      </div>
	    </div>
	)
    }
}

export default PostPage
