
import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import Graph from 'react-graph-vis'

import { Tags, Title } from '../services/posts'

class PostGraph extends Component {
    constructor(props) {
	super(props)
	this.graphRef = React.createRef()
    }

    getNetwork() {
	return this.graphRef.current.Network
    }

    setSelectedPosts(selection) {
	const { anySelected, selectedPosts } = selection
	if (!anySelected) {
	    this.getNetwork().selectNodes([])
	} else {
	    const selectedPostNodeIds = selectedPosts.map(post => `post:${post}`)
	    this.getNetwork().selectNodes(selectedPostNodeIds)
	}
    }

    componentDidMount() {
	this.setSelectedPosts(this.props.selection)
    }

    componentDidUpdate() {
	this.setSelectedPosts(this.props.selection)
    }

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
		entity: 'post'
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
		size: 10 * Math.pow(posts.length, 0.3),
		entity: 'tag'
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
		color: {
		    color: '#9ea2d0',
		    highlight: '#4c5196'
		},
		arrows: {
		    to: {
			enabled: false
		    }
		}
	    },
	    groups: {
		posts: {
		    shape: 'box',
		    color: {
			highlight: '#ffce93',
			background: '#ffe293'
		    },
		    borderWidth: 0,
		    labelHighlightBold: false,
		},
		tags: {
		    shape: 'dot',
		    color: {
			background: '#9ea2d0',
			highlight: '#4c5196'
		    },
		    borderWidth: 0,
		    labelHighlightBold: false,
		    font: {
			color: 'rgb(20, 20, 20)'
		    }
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
	    	stabilization: {
		    iterations: 10000
		}
	    }
	}
	const events = {
	    click: event => {
		if (event.nodes.length === 0) {
		    this.getNetwork().selectNodes([])
		}
	    },
	    doubleClick: event => {
	    	const [node] = event.nodes
	    	const [group, path] = node.split(':', 2)
	    	if (group === 'post') {
	    	    this.props.navigateToPost(path)
	    	}
	    },
	    selectNode: event => {
		const [node] = event.nodes
		const [group, id] = node.split(':', 2)
		if (group === 'tag') {
		    this.props.searchCallbacks.appendToSearch(id)
		} else if (group === 'post') {
		    const tags = Tags.findAll(id, posts[id])
		    const tagNodeIds = tags.map(tag => `tag:${tag}`)
		    this.getNetwork().selectNodes([node, ...tagNodeIds])
		}
	    }
	}
	const graph = { nodes: [...postNodes, ...tagNodes], edges: tagToPostEdges }
	return (
	    <Graph
	      graph={graph}
	      options={options}
	      events={events}
	      ref={this.graphRef}
	      style={{width: '100%', height: '100%', background: 'rgb(253,249,243)'}}
	    />
	)
    }
}

export default PostGraph
