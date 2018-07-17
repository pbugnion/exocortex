
import { connect } from 'react-redux'

import ContentsPage from './ContentsPage'

const mapStateToProps = state => {
    return {...state.posts}
}

export default connect(mapStateToProps)(ContentsPage)
