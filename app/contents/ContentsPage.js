
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
		  searchCallbacks={searchCallbacks}
		  selection={selection}
		  />
	       </div>
	    </div>
	)
    }
}

export default ContentsPage
