
import React, { Component } from 'react'

import { Tags, Title, Summary } from '../services/posts'

import TagList from './TagList'

const PostSummaryItem = ({ path, post, navigateToPost }) => {
    const title = Title.findOrFallback(path, post)
    const tags = Tags.findAll(post)
    const intro = Summary.create(post)
    return (
	<li className="list-group-item" onClick={() => navigateToPost(path)}>
	  <h3>{title}</h3>
	  <TagList tags={tags}/>
	  <p>{intro}</p>
	</li>
    )
}

export default PostSummaryItem
