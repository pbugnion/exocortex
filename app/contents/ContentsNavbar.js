
import React from 'react'

import PostSearchInput from './PostSearchInput'

const ContentsNavbar = ({ searchTerms, searchCallbacks }) => (
    <header className="toolbar toolbar-header">
      <h1 className="title">Exocortex</h1>
      <div className="toolbar-actions">
	<PostSearchInput
	  searchTerms={searchTerms}
	  searchCallbacks={searchCallbacks}
	  key={searchTerms}
	  />
      </div>
    </header>
)

export default ContentsNavbar
