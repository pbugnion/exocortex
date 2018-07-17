
import { connect } from 'react-redux'

import PostView from './PostView'

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

export default connect(mapStateToProps)(PostView)
    
