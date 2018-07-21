
import { AstSearcher } from './astSearcher'
import { MarkdownParser } from './parser'

describe('AstSearcher.buildRelevantAst', () => {

    test('single paragraph', () => {
	const ast = MarkdownParser.parse('some text')
	const result = AstSearcher.buildRelevantAst(ast, ['some'])
	expect(result.relevance).toEqual(1)
    })
    
    test('single paragraph, multiple search terms', () => {
	const ast = MarkdownParser.parse('some text')
	const result = AstSearcher.buildRelevantAst(ast, ['some', 'text'])
	expect(result.relevance).toEqual(2)
    })

    test('single heading', () => {
	const ast = MarkdownParser.parse('# some text')
	const result = AstSearcher.buildRelevantAst(ast, ['some'])
	expect(result.relevance).toEqual(1)
    })
})
