
import React, { Component } from 'react'

import { Title } from '../services/posts'

const PostSearchItem = ({ path, post }) => {
    const title = Title.findOrFallback(path, post)
    return (
	<li className="list-group-item">
	  <p>{title}</p>
	</li>
    )
}

export default PostSearchItem
