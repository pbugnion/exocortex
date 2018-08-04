
import React, { Component } from 'react'

import DotDotDot from 'react-dotdotdot'

import { Tags, Title, Summary } from '../services/posts'

import TagList from './TagList'

const PostSummaryItem = ({ path, post, navigateToPost }) => {
    const title = Title.findOrFallback(path, post)
    const tags = Tags.findAll(post)
    const intro = Summary.create(post)
    const introParagraphs = intro.map((line, iline) => (
	<p key={iline} className="SummaryText">{line}</p>
    ))
    return (
	<li className="list-group-item" onClick={() => navigateToPost(path)}>
	  <h3>{title}</h3>
	  <TagList tags={tags}/>
	  <DotDotDot clamp={2}>
	    <div>
	      {introParagraphs}
	    </div>
	  </DotDotDot>
	</li>
    )
}

export default PostSummaryItem
