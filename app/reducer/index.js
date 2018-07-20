
import { combineReducers } from 'redux'

import {
    RECEIVED_POST_LIST,
    RECEIVED_POST_CONTENTS,
    RECEIVED_POST_AST,
    RECEIVED_POST_METADATA,
    FINISHED_LOADING_POSTS
} from '../actions'

const initialPostState = {
    receivedPosts: false,
    postPaths: null,
    posts: {},
    finishedLoadingPosts: false
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
    default:
	return state
    }
}

export default combineReducers({
    posts
})
