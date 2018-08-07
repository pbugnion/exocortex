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
	<ContentsNavbar
	searchTerms={searchTerms}
	searchCallbacks={searchCallbacks}
	/>
	<div className="window-content">
	  <ContentsBody
	    finishedLoadingPosts={finishedLoadingPosts}
	    postPaths={postPaths}
	    posts={posts}
	    selection={selection}
	    navigateToPost={navigateToPost}
	  />
	</div>
      </div>
    )
  }
}

export default ContentsPage
