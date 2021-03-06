//@flow
import React, { Component } from 'react'

import DotDotDot from 'react-dotdotdot'

import { Tags, Title, Summary } from '../services/posts'

import TagList from './TagList'

import type { Post } from '../types'

type Props = {|
    path: string,
    post: Post,
    navigateToPost: string => void
|}

const PostSummaryItem = ({ path, post, navigateToPost }: Props) => {
    const title = Title.findOrFallback(path, post)
    const tags = Tags.findAll(post)
    const intro = Summary.create(post)
    const introParagraphs = intro.map((line, iline) => (
	<p key={iline} className="SummaryTextParagraph">{line}</p>
    ))
    return (
	<li
	    className="list-group-item PostSummaryItem"
	    onClick={() => navigateToPost(path)}
	>
	    <div className="PostSummaryContent">
		<h3 className="PostTitle">{title}</h3>
		<TagList tags={tags}/>
		{introParagraphs.length !== 0 && (
		     <DotDotDot clamp={2}>
			 <div className="SummaryText">
			     {introParagraphs}
			 </div>
		     </DotDotDot>
		)}
	    </div>
	</li>
    )
}

export default PostSummaryItem
