
import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class PostList extends Component {

    render() {
	const { postPaths } = this.props
	const postListItems = postPaths.map(
	    // TODO use library to stringify query
	    postPath => (
		<li key={postPath} className="list-group-item">
		  <Link to={`/post?path=${postPath}`}>{postPath}</Link>
		</li>
	    )
	)
	return (
	    <div>
	      <ul className="list-group">
		{postListItems}
	      </ul>
	    </div>
	)
    }
}

export default PostList
