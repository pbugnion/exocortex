
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import ContentsPage from './ContentsPage'

import { searchPostsFullText } from '../actions'

const mapStateToProps = state => {
    return {...state.posts}
}

const mapDispatchToProps = dispatch => {
    return {
	// TODO use library to stringify query
	navigateToPost: postPath => dispatch(push(`/post?path=${postPath}`)),
	searchCallbacks: {
	    cleared: () => console.log('cleared'),
	    fullText: searchQuery => dispatch(searchPostsFullText(searchQuery))
	}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentsPage)
