
import React from 'react'

import Tag from './Tag'

const TagList = ({ tags }) => {
    const tagComponents = tags.map(tag => <Tag tag={tag} key={tag}/>)
    return <div className="TagList">{tagComponents}</div>
}

export default TagList
