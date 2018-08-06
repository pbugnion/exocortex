//@flow

import React, { Component } from 'react'

import { Tags, Title } from '../services/posts'

import PostSummaryItem from './PostSummaryItem'

import type { PostMap, Selection } from '../types'

type Props = {|
    postPaths: Array<string>,
    posts: PostMap,
    selection: Selection,
    navigateToPost: string => void
|}

class PostSummaries extends Component<Props> {
    render() {
	const {
	    postPaths,
	    posts,
	    selection,
	    navigateToPost
	} = this.props
	let postPathsShown: Array<string> = [];
	if (selection.anySelected) {
	    postPathsShown = selection.selectedPosts
	} else {
	    postPathsShown = postPaths
	}
	const postItems = postPathsShown.map(path => {
	    return (
		<PostSummaryItem
		  path={path}
		  post={posts[path]}
		  key={path}
		  navigateToPost={navigateToPost}
		/>
	    )
	})
	return (
	    <ul className="list-group">
	      {postItems}
	    </ul>
	)
    }
}

export default PostSummaries
