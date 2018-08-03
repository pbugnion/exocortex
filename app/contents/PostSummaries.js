
import React, { Component } from 'react'

import { Tags, Title } from '../services/posts'

import PostSummaryItem from './PostSummaryItem'

class PostSummaries extends Component {
    render() {
	const {
	    postPaths,
	    posts,
	    selection,
	    navigateToPost
	} = this.props
	let postPathsShown = [];
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
