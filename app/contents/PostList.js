
import React, { Component } from 'react'

class PostList extends Component {

    render() {
	const { postIds, posts } = this.props
	const postListItems = postIds.map(
	    postId =>
		<li key={postId} className="list-group-item" onClick={() => console.log(postId)}>{posts[postId]}</li>
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
