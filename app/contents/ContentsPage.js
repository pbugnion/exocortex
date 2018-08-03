
import React, { Component } from 'react'

import ContentsNavbar from './ContentsNavbar'
import ContentsBody from './ContentsBody'

import './ContentsPage.scss'

class ContentsPage extends Component {
    render() {
	const {
	    finishedLoadingPosts,
	    postPaths,
	    posts,
	    selection,
	    searchTerms,
	    searchCallbacks,
	    navigateToPost
	} = this.props

	return (
	    <div className="window ContentsPage">
	      <ContentsNavbar />
	      <div className="window-content">
		<ContentsBody
		  finishedLoadingPosts={finishedLoadingPosts}
		  postPaths={postPaths}
		  posts={posts}
		  selection={selection}
		  searchTerms={searchTerms}
		  navigateToPost={navigateToPost}
		  searchCallbacks={searchCallbacks}
		  />
	       </div>
	    </div>
	)
    }
}

export default ContentsPage
