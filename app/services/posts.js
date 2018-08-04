
import path from 'path'
import astToString from 'mdast-util-to-string'

export class Tags {
    static findAll(post) {
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
    static create(post) {
	const { ast } = post
	if (typeof ast === 'undefined') {
	    return ''
	}
	const { children } = ast
	if (typeof children === 'undefined') {
	    return ''
	}
	const paragraphs = children.filter(({ type }) => type === 'paragraph')
	let summaries = []
	let totalSummaryLength = 0;
	for (let paragraph of paragraphs) {
	    if (totalSummaryLength > 500) break;
	    const paragraphString = astToString(paragraph)
	    summaries.push(paragraphString)
	    totalSummaryLength += paragraphString.length
	}
	return summaries
    }
}

export class Title {
    static find(post) {
	const metadata = Metadata.getMetadata(post)
	const title =
	      typeof metadata.title === 'undefined' ? null : metadata.title
	return title
    }

    static findOrFallback(filePath, post) {
	let title = this.find(post)
	if (title === null) {
	    const { name } = path.parse(filePath)
	    title = name || 'untitled'
	}
	return title
    }
}

class MetadataParseError extends Error {
    constructor(field, ...params) {
	super(...params)
	this.field = field
    }
}

export class Metadata {

    static fromFrontMatter(frontMatter) {
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

    static default() {
	return {
	    tags: [],
	    title: null
	}
    }

    static getMetadata(post) {
	if (typeof post === 'undefined' || typeof post.metadata === 'undefined' || post.metadata === null) {
	    return this.default()
	} else {
	    return post.metadata
	}
    }
}
