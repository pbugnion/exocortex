
import React, { Component } from 'react'

import PostGraph from './PostGraph'

class ContentsBody extends Component {
    render() {
	const { finishedLoadingPosts } = this.props
	if (!finishedLoadingPosts) {
	    return <div>Loading...</div>
	}
	else {
	    const { postPaths, posts, navigateToPost } = this.props
	    return (
		<PostGraph
		  postPaths={postPaths}
		  posts={posts}
		  navigateToPost={navigateToPost}
		/>
	    )
	}
    }
}

export default ContentsBody
