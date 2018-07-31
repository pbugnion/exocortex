
import { Tags } from '../posts'

export class TagsSearcher {
    static searchTags(post, term) {
	const tags = Tags.findAll('', post)
	let relevance
	if (tags.includes(term.toLowerCase())) {
	    relevance = 1.0
	} else {
	    relevance = 0.0
	}
	return relevance
    }
}
