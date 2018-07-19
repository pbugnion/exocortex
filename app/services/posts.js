
export class Tags {
    static findAll(filePath, post) {
	const metadata = Metadata.getMetadata(post)
	const tags = (
	      (typeof metadata.tags === 'undefined' || metadata.tags === null) ?
		[] :
		metadata.tags
	)
	if (! Array.isArray(tags)) {
	    throw new Error(`Tags for ${filePath} is not an array.`)
	}
	return tags
    }

    static buildTagInvertedIndex(posts) {
	const tagsIndex = {}
	Object.entries(posts).map(([filePath, post]) => {
	    const tags = this.findAll(filePath, post)
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
	if (typeof post.metadata === 'undefined' || post.metadata === null) {
	    return this.default()
	} else {
	    return post.metadata
	}
    }
}
