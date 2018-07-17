
import { connect } from 'react-redux'

import PostView from './PostView'

const mapStateToProps = (state, ownProps) => {
    const { postPath } = ownProps
    const { posts } = state
    return { postPath, post: posts.posts[postPath] }
}

export default connect(mapStateToProps)(PostView)
    
