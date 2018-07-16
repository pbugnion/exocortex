
import React from 'react'

import { Route, Switch } from 'react-router'

import ContentsPage from './contents/ContentsPage'

export default () => (
    <Switch>
	<Route exact path="/" component={ContentsPage} />
    </Switch>
)
