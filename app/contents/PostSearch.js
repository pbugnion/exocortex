
import React, { Component } from 'react'

import { Tags, Title } from '../services/posts'

import PostSearchItem from './PostSearchItem'

class PostSearch extends Component {
    constructor(props) {
	super(props)
	this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
	const searchValue = event.target.value
	const { searchCallbacks } = this.props
	if (searchValue === '') {
	    searchCallbacks.cleared()
	} else {
	    searchCallbacks.fullText(searchValue)
	}
    }

    render() {
	const { postPaths, posts, selection, searchForPost } = this.props
	let postPathsShown = [];
	if (selection.anySelected) {
	    postPathsShown = selection.selectedPosts
	} else {
	    postPathsShown = postPaths
	}
	const postItems = postPathsShown.map(path => {
	    return <PostSearchItem path={path} post={posts[path]} key={path}/>
	})
	return (
	    <ul className="list-group">
	      <li className="list-group-header">
		<input
		  className="form-control"
		  type="text"
		  placeholder="Search for a post"
		  onChange={this.handleChange}
		/>
	      </li>
	      {postItems}
	    </ul>
	)
    }
}

export default PostSearch
