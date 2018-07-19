
import React, { Component } from 'react'

import defaultRenderers from 'react-markdown/lib/renderers'
import astToReact from 'react-markdown/lib/ast-to-react'
import getDefinitions from 'react-markdown/lib/get-definitions'

class PostAst extends Component {
    render() {
	const { ast } = this.props
	const renderProps = {
	    renderers: { ...defaultRenderers, yaml: () => null },
	    definitions: getDefinitions(ast)
	}
	return astToReact(ast, renderProps)
    }
}

export default PostAst
