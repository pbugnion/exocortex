
import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import Graph from 'react-graph-vis'

import { Tags } from '../services/posts'

class PostList extends Component {

    render() {
	const { postPaths, posts } = this.props
	const tagIndex = Tags.buildTagInvertedIndex(posts)

	const postIndex = {}
	const postNodes = []

	postPaths.forEach((path, index) => {
	    postNodes.push({
		id: path,
		label: path
	    })
	    postIndex[path] = index
	})

	const tagNodes = []
	const tagToPostEdges = []

	Object.entries(tagIndex).forEach(([tag, posts], index) => {
	    tagNodes.push({
		id: tag,
		label: tag,
		color: 'red'
	    })
	    const nodeIndex = index + postNodes.length

	    posts.forEach(post => {
		tagToPostEdges.push({
		    from: tag,
		    to: post
		})
	    })
	})
	
	const options = {
	    edges: {
		color: 'red'
	    }
	}
	const events = {
	    click: (event) => {
		const [node] = event.nodes
		this.props.navigateToPost(node)
	    }
	}
	const graph = { nodes: [...postNodes, ...tagNodes], edges: tagToPostEdges }
	return <Graph graph={graph} options={options} events={events} />
    }
}

export default PostList
