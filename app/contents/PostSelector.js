
import React, { Component } from 'react'

class PostSelector extends Component {

    render() {
	const postList = [
	    'first',
	    'second'
	]
	const postListItems = postList.map(
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

export default PostSelector
