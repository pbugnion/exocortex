
import { connect } from 'react-redux'

import PostView from './PostView'

const mapStateToProps = (state, ownProps) => {
    const { postId } = ownProps
    return { postId, post: state.posts.posts[postId] }
}

export default connect(mapStateToProps)(PostView)
    
