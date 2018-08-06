//@flow

import React, { Component } from 'react'

import { SearchQuery } from '../services/search/searchQuery'
import { arrayEquals } from '../services/arrayEquals'

import type { SearchCallbacks } from '../types'

type Props = {
    searchTerms: Array<string>,
    searchCallbacks: SearchCallbacks
}

type State = {
    value: string
}

class PostSearchInput extends Component<Props, State> {
    handleChange: SyntheticEvent<HTMLInputElement> => void
    constructor(props: Props) {
	super(props)
	this.state = { value: this.props.searchTerms.join(' ') }
	this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event: SyntheticEvent<HTMLInputElement>) {
	const value = event.currentTarget.value
	const newTerms = SearchQuery.splitIntoTerms(value)
	const { searchTerms, searchCallbacks } = this.props
	if (arrayEquals(searchTerms, newTerms)) {
	    this.setState({ value })
	} else {
	    if (newTerms.length === 0) {
		searchCallbacks.cleared()
	    } else {
		searchCallbacks.fullText(newTerms)
	    }
	}
    }

    render() {
	return (
	    <input
	      autoFocus
	      type="text"
	      placeholder="Search for a post"
	      value={this.state.value}
	      onChange={this.handleChange}
	      />
	)
    }
}

export default PostSearchInput
