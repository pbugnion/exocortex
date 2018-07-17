
import { combineReducers } from 'redux'

import { RECEIVED_POST_LIST, RECEIVED_POST_CONTENTS } from '../actions'

const initialPostState = {
    receivedPosts: false,
    postIds: null,
    posts: {}
}

function findPostIdByPath(posts, path) {
    const searchResult = Object.entries(posts).find(([postId, post]) => post.path === path)
    if (typeof searchResult === 'undefined') {
	return null
    } else {
	return searchResult[0]
    }
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
    case RECEIVED_POST_CONTENTS:
	const { filePath, contents } = action
	const postId = findPostIdByPath(state.posts, filePath)
	if (postId !== null) {
	    const oldPost = state.posts[postId]
	    const newPost = { ...oldPost, contents }
	    const newPosts = { ...state.posts, [postId]: newPost }
	    return { ...state, posts: newPosts }
	} else {
	    console.error(`Failed to find post for path ${filePath}.`)
	    return posts
	}
    default:
	return state
    }
}

export default combineReducers({
    posts
})
