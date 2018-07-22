
import React, { Component } from 'react'

import ContentsNavbar from './ContentsNavbar'
import ContentsBody from './ContentsBody'

class ContentsPage extends Component {
    render() {
	const {
	    finishedLoadingPosts,
	    postPaths,
	    posts,
	    selection,
	    searchCallbacks,
	    navigateToPost
	} = this.props

	return (
	    <div className="window">
	      <ContentsNavbar />
	      <div className="window-content">
		<ContentsBody
		  finishedLoadingPosts={finishedLoadingPosts}
		  postPaths={postPaths}
		  posts={posts}
		  selection={selection}
		  navigateToPost={navigateToPost}
		  searchCallbacks={searchCallbacks}
		  />
	       </div>
	    </div>
	)
    }
}

export default ContentsPage
