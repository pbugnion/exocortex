
import React, { Component } from 'react'

import fs from 'fs'

import ReactMarkdown from 'react-markdown'

const source = fs.readFileSync('/Users/pascal/blogpost.md', {encoding: 'utf-8'})

class MarkdownViewer extends Component {
    render() {
	return <ReactMarkdown source={source} />
    }
}

export default MarkdownViewer
