
import React, { PureComponent } from 'react'

import PostSearchInput from './PostSearchInput'

class ContentsNavbar extends PureComponent {
    render() {
	return (
	    <header className="toolbar toolbar-header">
	      <h1 className="title">Exocortex</h1>
	      <div className="toolbar-actions">
		<PostSearchInput
		  searchTerms={[]}
		  searchCallbacks={{}}
		/>
	      </div>
	    </header>
	)
    }
}

export default ContentsNavbar
