
import { AstSearcher } from './astSearcher'

export class PostSearcher {
    static searchPost(post, terms) {
	let relevance = 1.0
	terms.forEach(term => {
	    if (relevance > 0.0) {
		const termRelevance = AstSearcher.buildRelevantAst(
		    post.ast, term).relevance
		relevance *= termRelevance
	    }
	})
	return { relevance }
    }
}
