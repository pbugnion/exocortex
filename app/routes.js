
import React from 'react'

import { Route, Switch } from 'react-router'

import ContentsPageContainer from './contents/ContentsPageContainer'
import PostViewContainer from './postView/PostViewContainer'

export default () => (
    <Switch>
	<Route exact path="/" component={ContentsPageContainer} />
	<Route
	  path="/post" // Expect post path in query string
	  render={({ location }) => {
	      const query = new URLSearchParams(location.search)
	      return <PostViewContainer postPath={query.get('path')} />
	  }}
	/>
    </Switch>
)
