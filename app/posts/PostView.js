
import React, { Component } from 'react'

import PostContent from './PostContent'

class PostView extends Component {
    render() {
	const { isLoaded, post } = this.props
	if (!isLoaded) {
	    return <div>Loading post...</div>
	} else {
	    return <PostContent post={post} />
	}
    }
}

export default PostView
