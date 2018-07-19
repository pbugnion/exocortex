
import React, { Component } from 'react'

import PostList from './PostList'

class ContentsPage extends Component {

    render() {
	const { receivedPosts } = this.props
	if (!receivedPosts) {
	    return <div className="window-content">Loading...</div>
	}
	else {
	    const { postPaths, posts, navigateToPost } = this.props
	    return (
		<div className="window-content">
		  <PostList
		    postPaths={postPaths}
		    posts={posts}
		    navigateToPost={navigateToPost}
		    />
		</div>
	    )
	}
    }

}

export default ContentsPage
