
import { AstSearcher } from './astSearcher'
import { PostSearcher } from './postSearcher'

describe('PostSearcher.searchPost', () => {
    let AstSearcher
    let PostSearcher

    beforeEach(() => {
	PostSearcher = require('./postSearcher').PostSearcher
	AstSearcher = require('./astSearcher').AstSearcher
    })

    it('single term in AST', () => {
	AstSearcher.buildRelevantAst = jest.fn().mockReturnValue({ relevance: 22 })
	const ast = 'some ast'
	const post = { ast }
	expect(PostSearcher.searchPost(post, ['search-term'])).toEqual({ relevance: 22 })
	expect(AstSearcher.buildRelevantAst).toBeCalledWith(ast, 'search-term')
    })

    it('multipe terms in AST', () => {
	AstSearcher.buildRelevantAst = jest.fn()
	    .mockReturnValueOnce({ relevance: 22 })
	    .mockReturnValueOnce({ relevance: 2 })
	const ast = 'some ast'
	const post = { ast }
	expect(PostSearcher.searchPost(post, ['first', 'second'])).toEqual({ relevance: 44 })
	expect(AstSearcher.buildRelevantAst).toBeCalledWith(ast, 'first')
	expect(AstSearcher.buildRelevantAst).toBeCalledWith(ast, 'second')
    })

    it('term with no relevance', () => {
	AstSearcher.buildRelevantAst = jest.fn()
	    .mockReturnValueOnce({ relevance: 0 })
	    .mockReturnValueOnce({ relevance: 2 })
	const ast = 'some ast'
	const post = { ast }
	expect(PostSearcher.searchPost(post, ['first', 'second'])).toEqual({ relevance: 0 })
	expect(AstSearcher.buildRelevantAst).toBeCalledWith(ast, 'first')
    })

})
