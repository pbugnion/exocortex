//@flow

export type EmptySelection = {|
    anySelected: false
|}

export type NonEmptySelection = {|
    anySelected: true,
    selectedPosts: Array<string>
|}

export type Selection = EmptySelection | NonEmptySelection

export type Post = {|
    contents: string,
    ast?: Object,
    metadata?: Object
|}

export type PostMap = { [string]: Post }
