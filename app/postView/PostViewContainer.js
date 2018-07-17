
import { connect } from 'react-redux'

import PostView from './PostView'

const mapStateToProps = ({ posts }, ownProps) => {
    const { postPath } = ownProps
    const post = posts.posts[postPath]
    const isLoaded = (
	(typeof post !== 'undefined') && post.contents !== null
    )
    return { postPath, isLoaded, post }
}

export default connect(mapStateToProps)(PostView)
    
