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

export type PostMap = { [string]: Post }

export type SearchCallbacks = {|
    cleared: () => void,
    fullText: Array<string> => void,
    appendToSearch: string => void
|}

export type RelevantNode = RelevantLeafNode | RelevantBranchNode

export type RelevantLeafNode = {|
  type: string,
  relevance: number,
  value: Object
|}

export type RelevantBranchNode = {|
  type: string,
  relevance: number,
  children: Array<RelevantNode>
|}

export type AstNode = {|
  type: string,
  children?: Array<AstNode>,
  value?: string
|}

export type Post = {|
    contents: string,
    ast?: AstNode,
    metadata?: PostMetadata
|}
