//@flow

export type EmptySelection = {|
    anySelected: false
|}

export type NonEmptySelection = {|
    anySelected: true,
    selectedPosts: Array<string>
|}

export type Selection = EmptySelection | NonEmptySelection

export type PostMetadata = {|
  tags: Array<string>,
  title: ?string
|}

export type Post = {|
    contents: string,
    ast?: Object,
    metadata?: PostMetadata
|}

export type PostMap = { [string]: Post }

export type SearchCallbacks = {|
    cleared: () => void,
    fullText: Array<string> => void,
    appendToSearch: string => void
|}
