//@flow

import React from 'react'

type Props = {|
    tag: string
|}

const Tag = ({ tag }: Props) => (
    <span className="Tag">{tag}</span>
)

export default Tag
