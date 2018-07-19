
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import PostPage from './PostPage'

const mapStateToProps = ({ posts }, ownProps) => {
    const { postPath } = ownProps
    const post = posts.posts[postPath]
    let isLoaded = false
    if (typeof post !== 'undefined') {
	if (typeof post.ast !== 'undefined' && post.ast !== null) {
	    isLoaded = true
	}
    }
    return { postPath, isLoaded, post }
}

const mapDispatchToProps = (dispatch) => {
    return {
	onNavigateHome: () => dispatch(push('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostPage)
