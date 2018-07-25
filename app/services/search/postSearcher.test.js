
import { AstSearcher } from './astSearcher'
import { PostSearcher } from './postSearcher'

describe('PostSearcher.searchPost', () => {
    let AstSearcher
    let PostSearcher

    beforeEach(() => {
	PostSearcher = require('./postSearcher').PostSearcher
	AstSearcher = require('./astSearcher').AstSearcher
    })

    it.only('single term in AST', () => {
	AstSearcher.buildRelevantAst = jest.fn().mockReturnValue({ relevance: 22 })
	const post = { ast: 'some ast' }
	expect(PostSearcher.searchPost(post, ['search-term'])).toEqual({ relevance: 22 })
	expect(AstSearcher.buildRelevantAst).toBeCalledWith(post, 'search-term')
    })

})
