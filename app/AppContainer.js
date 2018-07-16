
import { connect } from 'react-redux'

import App from './app'
import { APP_START } from './actions'

const mapStateToProps = state => {return {}}

const mapDispatchToProps = dispatch => {
    return {
	onAppStart: () => { dispatch({ type: APP_START }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
