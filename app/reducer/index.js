
import { combineReducers } from 'redux'

import { RECEIVED_POST_LIST } from '../actions'

const initialPostState = {
    receivedPosts: false,
    postIds: null,
    posts: {}
}

function posts(state = initialPostState, action) {
    switch (action.type) {
    case RECEIVED_POST_LIST:
	const newPosts = {}
	const newPostIds = []
	action.paths.map((path, index) => {
	    const newPostId = index.toString()
	    newPostIds.push(newPostId)
	    newPosts[newPostId] = { path }
	})
	return {...state, postIds: newPostIds, posts: newPosts, receivedPosts: true}
    default:
	return state
    }
}

export default combineReducers({
    posts
})
