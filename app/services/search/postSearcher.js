
import { AstSearcher } from './astSearcher'

export class PostSearcher {
    static searchPost(post, terms) {
	let relevance = 1.0
	terms.forEach(term => {
	    if (relevance > 0.0) {
		const termAst = AstSearcher.buildRelevantAst(
		    post.ast, term)
		const termRelevance = termAst === null ? 0.0 : termAst.relevance
		relevance *= termRelevance
	    }
	})
	return { relevance }
    }
}
