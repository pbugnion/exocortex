
import React from 'react'

import { Route, Switch } from 'react-router'

import ContentsPageContainer from './contents/ContentsPageContainer'
import PostViewContainer from './postView/PostViewContainer'

export default () => (
    <Switch>
	<Route exact path="/" component={ContentsPageContainer} />
	<Route
	  path="/post/:postId"
	  render={({ match }) => (
	      <PostViewContainer postId={match.params.postId} />
	  )}
	/>
    </Switch>
)
