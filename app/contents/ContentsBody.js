
import React, { Component } from 'react'

import PostGraph from './PostGraph'
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
		searchCallbacks,
		navigateToPost
	    } = this.props
	    return (
		<div className="pane-group">
		  <div className="pane">
		    <PostGraph
		      postPaths={postPaths}
		      posts={posts}
		      navigateToPost={navigateToPost}
		      />
		  </div>
		  <div className="pane-one-fourth sidebar">
		    <PostSearch
		      postPaths={postPaths}
		      posts={posts}
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
