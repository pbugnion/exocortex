
import React, { Component } from 'react'

import fs from 'fs'

import ReactMarkdown from 'react-markdown'

class PostView extends Component {
    render() {
	const { post } = this.props
	if (post === null || post.contents === null) {
	    return <div>Loading post</div>
	} else {
	    return <ReactMarkdown source={post.contents} />
	}
    }
}

export default PostView
