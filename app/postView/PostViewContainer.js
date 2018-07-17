
import { connect } from 'react-redux'

import PostView from './PostView'

const mapStateToProps = (state, ownProps) => {
    const { postId } = ownProps
    const { posts } = state
    return { postId, post: posts.posts[postId] }
}

export default connect(mapStateToProps)(PostView)
    
