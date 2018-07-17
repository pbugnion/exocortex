
import React, { Component } from 'react'

import fs from 'fs'

import ReactMarkdown from 'react-markdown'

class PostView extends Component {
    render() {
	const { isLoaded, post } = this.props
	if (!isLoaded) {
	    return <div>Loading post...</div>
	} else {
	    return <ReactMarkdown source={post.contents} />
	}
    }
}

export default PostView
