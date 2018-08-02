
import React from 'react'

import PostAst from './PostAst'

import './PostContent.scss'

const PostContent = ({ post })=> (
    <div className="PostContent">
      <PostAst ast={post.ast} />
    </div>
)

export default PostContent
