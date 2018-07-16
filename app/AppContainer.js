
import { connect } from 'react-redux'

import App from './app'

const mapStateToProps = state => {return {}}

const mapDispatchToProps = dispatch => {
    return {
	onAppStart: () => { console.log('hello app start') }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
