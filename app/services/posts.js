
export class Tags {
    static findAll(filePath, post) {
	const tags = post.tags ? post.tags : []
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
