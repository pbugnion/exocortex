
export class Tags {
    static buildTagInvertedIndex(posts) {
	const tagsIndex = {}
	Object.entries(posts).map(([filePath, post]) => {
	    const tags = post.tags ? post.tags : []
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
