
import React, { Component } from 'react'

import fs from 'fs'

import ReactMarkdown from 'react-markdown'

class PostView extends Component {
    render() {
	// TODO what if the post has no contents yet
	const { post } = this.props
	console.log(post.contents)
	return <ReactMarkdown source={post.contents} />
    }
}

export default PostView
