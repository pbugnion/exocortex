
import React, { Component } from 'react'

import PostList from './PostList'

class ContentsPage extends Component {

    render() {
	const { receivedPosts } = this.props
	if (!receivedPosts) {
	    return <div>Loading...</div>
	}
	else {
	    const { postIds, posts } = this.props
	    return <PostList postIds={postIds} posts={posts} />
	}
    }

}

export default ContentsPage
