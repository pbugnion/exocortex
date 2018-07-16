
import React, { Component } from 'react'

class PostList extends Component {

    render() {
	const { postTitles } = this.props
	const postListItems = postTitles.map(
	    post =>
		<li key={post} className="list-group-item" onClick={() => console.log('hello')}>{post}</li>
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
