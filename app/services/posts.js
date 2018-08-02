
import path from 'path'

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

    static buildTagInvertedIndex(posts) {
	const tagsIndex = {}
	Object.entries(posts).map(([filePath, post]) => {
	    const tags = this.findAll(post)
	    tags.forEach(tag => {
		if (typeof tagsIndex[tag] === 'undefined') {
		    tagsIndex[tag] = [filePath]
		} else {
		    tagsIndex[tag].push(filePath)
		}
	    })
	})
	return tagsIndex
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
