//@flow

import React, { Component } from 'react'

import PostSummaries from './PostSummaries'

import type { PostMap, Selection, SearchCallbacks } from '../types'

type Props = {|
  finishedLoadingPosts: boolean,
  postPaths: Array<string>,
  posts: PostMap,
  selection: Selection,
  navigateToPost: string => void
|}

class ContentsBody extends Component<Props> {
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
	navigateToPost
      } = this.props
      return (
	<PostSummaries
	  postPaths={postPaths}
	  posts={posts}
	  navigateToPost={navigateToPost}
	  selection={selection}
	/>
      )
    }
  }
}

export default ContentsBody
