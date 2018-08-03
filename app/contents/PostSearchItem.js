
import React, { Component } from 'react'

import { Tags, Title } from '../services/posts'

const PostSearchItem = ({ path, post, navigateToPost }) => {
    const title = Title.findOrFallback(path, post)
    const tags = Tags.findAll(post).join(' ')
    const intro = 'hello text hello jfdklsfjlds'
    return (
	<li className="list-group-item" onClick={() => navigateToPost(path)}>
	  <h2>{title}</h2>
	  <p>{tags}</p>
	  <p>{intro}</p>
	</li>
    )
}

export default PostSearchItem
