
import React, { Component } from 'react'

import { Title } from '../services/posts'

const PostSearchItem = ({ path, post, navigateToPost }) => {
    const title = Title.findOrFallback(path, post)
    return (
	<li className="list-group-item" onClick={() => navigateToPost(path)}>
	  <p>{title}</p>
	</li>
    )
}

export default PostSearchItem
