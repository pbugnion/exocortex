
import { AstSearcher } from './astSearcher'
import { TagsSearcher } from './tagsSearcher'

export class PostSearcher {
    static searchPost(post, terms) {
	let relevance = 1.0
	terms.forEach(term => {
	    if (relevance > 0.0) {
		const termAst = AstSearcher.buildRelevantAst(
		    post.ast, term)
		const termRelevance = termAst === null ? 0.0 : termAst.relevance
		const tagsRelevance = TagsSearcher.searchTags(post, term)
		relevance *= (termRelevance + 5*tagsRelevance)
	    }
	})
	return { relevance }
    }
}
