
import React from 'react'

import { Route, Switch } from 'react-router'

import ContentsPage from './contents/ContentsPageContainer'
import PostPage from './posts/PostPageContainer'

export default () => (
    <Switch>
	<Route exact path="/" component={ContentsPage} />
	<Route
	  path="/post" // Expect post path in query string
	  render={({ location }) => {
	      const query = new URLSearchParams(location.search)
	      return <PostPage postPath={query.get('path')} />
	  }}
	/>
    </Switch>
)
