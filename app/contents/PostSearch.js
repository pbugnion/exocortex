
import React, { Component } from 'react'

import { Tags, Title } from '../services/posts'

class PostSearch extends Component {
    render() {
	const { postPaths, posts } = this.props
	const postItems = postPaths.map(path => {
	    const title = Title.findOrFallback(path, posts[path])
	    return (
		<li className="list-group-item">
		  <p>{title}</p>
		</li>
	    )
	})
	return (
	    <ul className="list-group">
	      <li className="list-group-header">
		<input className="form-control" type="text" placeholder="Search for a post" />
	      </li>
	      {postItems}
	    </ul>
	)
    }
}

export default PostSearch
