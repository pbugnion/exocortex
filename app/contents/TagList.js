//@flow

import React from 'react'

import Tag from './Tag'

type Props = {|
    tags: Array<string>
|}

const TagList = ({ tags }: Props) => {
    const tagComponents = tags.map(tag => <Tag tag={tag} key={tag}/>)
    return <div className="TagList">{tagComponents}</div>
}

export default TagList
