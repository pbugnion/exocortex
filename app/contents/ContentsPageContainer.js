
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import ContentsPage from './ContentsPage'

const mapStateToProps = state => {
    return {...state.posts}
}

const mapDispatchToProps = dispatch => {
    return {
	// TODO use library to stringify query
	navigateToPost: postPath => dispatch(push(`/post?path=${postPath}`)),
	searchCallbacks: {
	    cleared: () => console.log('cleared'),
	    fullText: searchValue => console.log(searchValue)
	}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentsPage)
