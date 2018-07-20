
import React, { Component } from 'react'

import ContentsBody from './ContentsBody'

class ContentsPage extends Component {
    render() {
	const {
	    finishedLoadingPosts,
	    postPaths,
	    posts,
	    navigateToPost
	} = this.props

	return (
	    <ContentsBody
	      finishedLoadingPosts={finishedLoadingPosts}
	      postPaths={postPaths}
	      posts={posts}
	      navigateToPost={navigateToPost}
	    />
	)
    }
}

export default ContentsPage
