
import React from 'react'

import { Route, Switch } from 'react-router'

import ContentsPageContainer from './contents/ContentsPageContainer'

export default () => (
    <Switch>
	<Route exact path="/" component={ContentsPageContainer} />
    </Switch>
)
