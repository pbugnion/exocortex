
import React, { Component } from 'react'

import PostSummaries from './PostSummaries'

class ContentsBody extends Component {
    render() {
	const { finishedLoadingPosts } = this.props
	if (!finishedLoadingPosts) {
	    return <div>Loading...</div>
	}
	else {
	    const {
		postPaths,
		posts,
		selection,
		searchTerms,
		searchCallbacks,
		navigateToPost
	    } = this.props
	    return (
		<PostSummaries
		  postPaths={postPaths}
		  posts={posts}
		  searchTerms={searchTerms}
		  searchCallbacks={searchCallbacks}
		  navigateToPost={navigateToPost}
		  selection={selection}
		/>
	    )
	}
    }
}

export default ContentsBody
