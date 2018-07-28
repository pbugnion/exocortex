
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import ContentsPage from './ContentsPage'

import { clearSearch, searchPostsFullText } from '../actions'

const mapStateToProps = state => {
    const {
	finishedLoadingPosts,
	postPaths,
	posts,
	search
    } = state.posts

    let selection = {
	anySelected: false
    }
    if (search.type === 'fullText') {
	selection = {
	    anySelected: true,
	    selectedPosts: search.results.map(({ postPath }) => postPath)
	}
    }
    return {
	finishedLoadingPosts,
	postPaths,
	posts,
	selection
    }
}

const mapDispatchToProps = dispatch => {
    return {
	// TODO use library to stringify query
	navigateToPost: postPath => dispatch(push(`/post?path=${postPath}`)),
	searchCallbacks: {
	    cleared: () => dispatch(clearSearch()),
	    fullText: searchQuery => dispatch(searchPostsFullText(searchQuery))
	}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentsPage)
