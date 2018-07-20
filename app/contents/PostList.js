
import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import Graph from 'react-graph-vis'

import { Tags, Title } from '../services/posts'

class PostList extends Component {
    render() {
	const { postPaths, posts } = this.props
	const tagIndex = Tags.buildTagInvertedIndex(posts)

	const postIndex = {}
	const postNodes = []

	postPaths.forEach((path, index) => {
	    postNodes.push({
		id: `post:${path}`,
		label: Title.findOrFallback(path, posts[path]),
		group: 'posts',
	    })
	    postIndex[path] = index
	})

	const tagNodes = []
	const tagToPostEdges = []

	Object.entries(tagIndex).forEach(([tag, posts], index) => {
	    tagNodes.push({
		id: `tag:${tag}`,
		label: tag,
		group: 'tags',
		mass: Math.pow(posts.length, 1.5),
		font: {
		    size: 14 * Math.pow(posts.length, 0.4)
		},
		size: 10 * Math.pow(posts.length, 0.3)
	    })
	    const nodeIndex = index + postNodes.length

	    posts.forEach(post => {
		tagToPostEdges.push({
		    from: `tag:${tag}`,
		    to: `post:${post}`
		})
	    })
	})
	
	const options = {
	    edges: {
		color: '#000000'
	    },
	    groups: {
		posts: {
		    shape: 'box',
		    color: 'rgb(192,207,253)'
		},
		tags: {
		    shape: 'dot',
		    color: 'rgb(253,180,153)',
		}
	    },
	    physics: {
		enabled: true,
	    	barnesHut: {
	    	    avoidOverlap: 0.2,
		    damping: 1.0,
		    springLength: 50
	    	},
		maxVelocity: 20,
	    	stabilization: {iterations: 10000}
	    }
	}
	const events = {
	    click: (event) => {
		const [node] = event.nodes
		const [group, path] = node.split(':', 2)
		if (group === 'post') {
		    this.props.navigateToPost(path)
		}
	    }
	}
	const graph = { nodes: [...postNodes, ...tagNodes], edges: tagToPostEdges }
	return <Graph graph={graph} options={options} events={events} />
    }
}

export default PostList
