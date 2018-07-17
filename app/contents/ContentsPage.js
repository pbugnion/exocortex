
import React, { Component } from 'react'

import PostList from './PostList'

class ContentsPage extends Component {

    render() {
	const { receivedPosts } = this.props
	if (!receivedPosts) {
	    return <div>Loading...</div>
	}
	else {
	    const { postPaths, posts } = this.props
	    return <PostList postPaths={postPaths} posts={posts} />
	}
    }

}

export default ContentsPage
