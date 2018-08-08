//@flow

import path from 'path'
import astToString from 'mdast-util-to-string'

import type { Post, PostMetadata } from '../types'

export class Tags {
  static findAll(post: Post): Array<string> {
    const metadata = Metadata.getMetadata(post)
    const tags = (
      (typeof metadata.tags === 'undefined' || metadata.tags === null) ?
      [] :
      metadata.tags
    )
    if (! Array.isArray(tags)) {
      throw new Error('Tags is not an array.')
    }
    return tags
  }
}

export class Summary {
  static create(post: Post): Array<string> {
    const { ast } = post
    if (typeof ast === 'undefined') {
      return []
    }
    const { children } = ast
    if (typeof children === 'undefined') {
      return []
    }
    const paragraphs = children.filter(({ type }) => type === 'paragraph')
    let summaries = []
    let totalSummaryLength = 0;
    for (let paragraph of paragraphs.slice(0, 2)) {
      const paragraphString = astToString(paragraph)
      if (paragraphString.length + totalSummaryLength > 500) {
	summaries.push(paragraphString.substring(0, 500 - totalSummaryLength))
	break
      } else {
	summaries.push(paragraphString)
	totalSummaryLength += paragraphString.length
      }
    }
    return summaries
  }
}

export class Title {
  static find(post: Post): ?string {
    const metadata = Metadata.getMetadata(post)
    const title =
      typeof metadata.title === 'undefined' ? null : metadata.title
    return title
  }

  static default(): string {
    return 'untitled'
  }

  static findOrFallback(filePath: string, post: Post): string {
    let title = this.find(post)
    if (title === null) {
      const { name } = path.parse(filePath)
      title = name
    }
    return title || 'untitled'
  }
}

class MetadataParseError extends Error {
  field: string
  constructor(field, ...params) {
    super(...params)
    this.field = field
  }
}

export class Metadata {

  static fromFrontMatter(frontMatter: Object): PostMetadata {
    // TODO Use proper schema validator
    const tags = frontMatter.tags ? frontMatter.tags : []
    if (! Array.isArray(tags)) {
      throw new MetadataParseError(
	'tag',
	'Tags should be an array.'
      )
    }
    const title = (
      (typeof frontMatter.title === 'undefined') ?
      null :
      frontMatter.title
    )

    // check title is a string
    if (title !== null && !(typeof title === 'string') || (title instanceof String)) {
      throw new MetadataParseError(
	'title',
	'Title should be a string'
      )
    }
    return { tags, title }
  }

  static default(): PostMetadata {
    return {
      tags: [],
      title: null
    }
  }

  static getMetadata(post: Post): PostMetadata {
    if (typeof post === 'undefined' || typeof post.metadata === 'undefined' || post.metadata === null) {
      return this.default()
    } else {
      return post.metadata
    }
  }
}
