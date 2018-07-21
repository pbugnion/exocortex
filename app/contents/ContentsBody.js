
import React, { Component } from 'react'

import PostList from './PostList'

class ContentsBody extends Component {
    render() {
	const { finishedLoadingPosts } = this.props
	if (!finishedLoadingPosts) {
	    return <div>Loading...</div>
	}
	else {
	    const { postPaths, posts, navigateToPost } = this.props
	    return (
		<PostList
		  postPaths={postPaths}
		  posts={posts}
		  navigateToPost={navigateToPost}
		/>
	    )
	}
    }
}

export default ContentsBody
