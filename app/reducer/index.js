
import { combineReducers } from 'redux'

import { RECEIVED_POST_LIST } from '../actions'

const initialPostState = {
    receivedPosts: false,
    posts: null
}

function posts(state = initialPostState, action) {
    switch (action.type) {
	case RECEIVED_POST_LIST:
	    return {...state, posts: action.files, receivedPosts: true}
	default:
	    return state
    }
}

export default combineReducers({
    posts
})
