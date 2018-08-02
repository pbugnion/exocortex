
import React, { Component } from 'react'

import { Tags, Title } from '../services/posts'

import PostSearchItem from './PostSearchItem'
import PostSearchInput from './PostSearchInput'

class PostSearch extends Component {
    render() {
	const {
	    postPaths,
	    posts,
	    searchTerms,
	    selection,
	    searchCallbacks,
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
		<PostSearchItem
		  path={path}
		  post={posts[path]}
		  key={path}
		  navigateToPost={navigateToPost}
		/>
	    )
	})
	return (
	    <ul className="list-group">
	      <PostSearchInput
		searchTerms={searchTerms}
		searchCallbacks={searchCallbacks}
		key={searchTerms}
	      />
	      {postItems}
	    </ul>
	)
    }
}

export default PostSearch
