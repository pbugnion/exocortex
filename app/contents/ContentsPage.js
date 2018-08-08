//@flow

import React, { Component } from 'react'

import ContentsNavbar from './ContentsNavbar'
import ContentsBody from './ContentsBody'

import './ContentsPage.scss'

import type { PostMap, Selection, SearchCallbacks } from '../types'

type Props = {|
  finishedLoadingPosts: boolean,
  postPaths: Array<string>,
  posts: PostMap,
  selection: Selection,
  searchTerms: Array<string>,
  searchCallbacks: SearchCallbacks,
  navigateToPost: string => void
|}

class ContentsPage extends Component<Props> {
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
