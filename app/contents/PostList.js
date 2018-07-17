
import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class PostList extends Component {

    render() {
	const { postIds, posts } = this.props
	const postListItems = postIds.map(
	    postId => (
		<li key={postId} className="list-group-item">
		  <Link to={`/post/0`}>{posts[postId]}</Link>
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
