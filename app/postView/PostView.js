
import React, { Component } from 'react'

import PostAst from './PostAst'

class PostView extends Component {
    render() {
	const { isLoaded, post } = this.props
	if (!isLoaded) {
	    return <div>Loading post...</div>
	} else {
	    return <PostAst ast={post.ast} />
	}
    }
}

export default PostView
