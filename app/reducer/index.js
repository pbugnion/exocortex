
import { combineReducers } from 'redux'

import {
    RECEIVED_POST_LIST,
    RECEIVED_POST_CONTENTS,
    RECEIVED_POST_AST,
    RECEIVED_POST_METADATA,
    FINISHED_LOADING_POSTS,

    SEARCH_POSTS_FULL_TEXT
} from '../actions'

import { AstSearcher } from '../services/markdown/astSearcher'

const initialPostState = {
    receivedPosts: false,
    postPaths: null,
    posts: {},
    finishedLoadingPosts: false,
    search: {
	type: 'noSearch'
    }
}

function posts(state = initialPostState, action) {
    switch (action.type) {
    case RECEIVED_POST_LIST:
	const newPosts = {}
	return {...state, postPaths: action.paths, receivedPosts: true}
    case RECEIVED_POST_CONTENTS: {
	const { filePath, contents } = action
	const oldPost = state.posts[filePath]
	const newPost = { ...oldPost, contents }
	const newPosts = { ...state.posts, [filePath]: newPost }
	return { ...state, posts: newPosts }
    }
    case RECEIVED_POST_AST: {
	const { filePath, ast } = action
	const oldPost = state.posts[filePath]
	const newPost = { ...oldPost, ast }
	const newPosts = { ...state.posts, [filePath]: newPost }
	return { ...state, posts: newPosts }
    }
    case RECEIVED_POST_METADATA: {
	const { filePath, metadata } = action
	const oldPost = state.posts[filePath]
	const newPost = { ...oldPost, metadata }
	const newPosts = { ...state.posts, [filePath]: newPost }
	return { ...state, posts: newPosts }
    }
    case FINISHED_LOADING_POSTS:
	return { ...state, finishedLoadingPosts: true }
    case SEARCH_POSTS_FULL_TEXT:
	const { searchQuery } = action
	const relevantPosts = []
	state.postPaths.forEach(postPath => {
	    const post = state.posts[postPath]
	    if (typeof post !== 'undefined') {
		const searchResultForPost = AstSearcher.buildRelevantAst(
		    post.ast, [searchQuery])
		const relevance = (
		    searchResultForPost === null ?
			0.0 :
			searchResultForPost.relevance
		)
		if (relevance !== 0.0) {
		    relevantPosts.push({
			postPath,
			relevance
		    })
		}
	    }
	})
	const results = relevantPosts.sort(({ relevance }) => relevance).reverse()
	return {
	    ...state,
	    search: {
		type: 'fullText',
		terms: [searchQuery],
		results
	    }
	}
    default:
	return state
    }
}

export default combineReducers({
    posts
})
