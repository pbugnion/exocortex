
import { connect } from 'react-redux'

import App from './app'

const mapStateToProps = state => {return {}}

const mapDispatchToProps = dispatch => {
    return {
	onAppStart: () => { dispatch({ type: 'APP_START' }) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
