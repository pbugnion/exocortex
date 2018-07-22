
import React, { Component } from 'react'

import { Tags, Title } from '../services/posts'

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
	const { postPaths, posts, searchForPost } = this.props
	const postItems = postPaths.map(path => {
	    const title = Title.findOrFallback(path, posts[path])
	    return (
		<li className="list-group-item" key={path}>
		  <p>{title}</p>
		</li>
	    )
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
