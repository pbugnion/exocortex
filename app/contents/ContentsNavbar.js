//@flow

import React from 'react'

import PostSearchInput from './PostSearchInput'

import type { SearchCallbacks } from '../types'

type Props = {|
    searchTerms: Array<string>,
    searchCallbacks: SearchCallbacks
|}

const ContentsNavbar = ({ searchTerms, searchCallbacks }: Props) => (
    <header className="toolbar toolbar-header">
      <h1 className="title">Exocortex</h1>
      <div className="toolbar-actions ToolbarSearch">
	<PostSearchInput
	  searchTerms={searchTerms}
	  searchCallbacks={searchCallbacks}
          key={searchTerms.join(':')}
	  />
      </div>
    </header>
)

export default ContentsNavbar
