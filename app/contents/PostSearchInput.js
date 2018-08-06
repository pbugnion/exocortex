
import React, { Component } from 'react'

import { SearchQuery } from '../services/search/searchQuery'
import { arrayEquals } from '../services/arrayEquals'

class PostSearchInput extends Component {
    constructor(props) {
	super(props)
	this.state = { value: this.props.searchTerms.join(' ') }
	this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
	const value = event.target.value
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
