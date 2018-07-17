
import { combineReducers } from 'redux'

import { RECEIVED_POST_LIST, RECEIVED_POST_CONTENTS } from '../actions'

const initialPostState = {
    receivedPosts: false,
    postPaths: null,
    posts: {}
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
    default:
	return state
    }
}

export default combineReducers({
    posts
})
