
import React, { Component } from 'react'

import fs from 'fs'

import ReactMarkdown from 'react-markdown'

//const source = fs.readFileSync('/Users/pascal/blogpost.md', {encoding: 'utf-8'})

class PostView extends Component {
    render() {
	const { postId, post } = this.props
	return <div>{postId} : {post}</div>
	//return <ReactMarkdown source={source} />
    }
}

export default PostView
