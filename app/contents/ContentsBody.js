
import React, { Component } from 'react'

import PostSearch from './PostSearch'

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
		<div className="pane-group">
		  <div className="pane">
		    <PostSearch
		      postPaths={postPaths}
		      posts={posts}
		      searchTerms={searchTerms}
		      searchCallbacks={searchCallbacks}
		      navigateToPost={navigateToPost}
		      selection={selection}
		    />
		  </div>
		</div>
	    )
	}
    }
}

export default ContentsBody
