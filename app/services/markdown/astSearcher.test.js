
import { AstSearcher } from './astSearcher'
import { MarkdownParser } from './parser'

import fs from 'fs'
import path from 'path'

describe('AstSearcher.buildRelevantAst', () => {

    function buildAstForText(text, terms) {
	const ast = MarkdownParser.parse(text)
	const result = AstSearcher.buildRelevantAst(ast, terms)
	return result
    }

    function buildAstForFile(pathInResources, terms) {
	const postPath = path.join(__dirname, '../../../__test__/', pathInResources)
	const content = fs.readFileSync(postPath, { encoding: 'utf-8' })
	const result = buildAstForText(content, terms)
	return result
    }

    function checkRelevanceForText(text, terms, expectedRelevance) {
	const result = buildAstForText(text, terms)
	expect(result.relevance).toEqual(expectedRelevance)
    }

    function checkRelevanceForFile(pathInResources, terms, expectedRelevance) {
	const result = buildAstForFile(pathInResources, terms)
	expect(result.relevance).toEqual(expectedRelevance)
    }

    test('single paragraph', () => checkRelevanceForText('some text', ['some'], 1))

    test('ignore case', () => checkRelevanceForText('SOmE text', ['sOme'], 1))

    test('multiple matches', () => checkRelevanceForText('some some', ['some'], 2))
    
    test(
	'single paragraph, multiple search terms',
	() => checkRelevanceForText('some text', ['some', 'text'], 2)
    )

    test(
	'single heading',
	() => checkRelevanceForText('# some text', ['some'], 2)
    )

    test('heading and paragraph', () => {
	const text = `
# some text

some paragraph
`
	checkRelevanceForText(text, ['some'], 3)
    })

    test('heading and paragraph, multiple search terms', () => {
	const text = `
# some text

some paragraph
`

	checkRelevanceForText(text, ['some', 'text'], 5)
    })

    test('emphasized text', () => checkRelevanceForText('*some* text', ['some'], 2))

    test(
	'emphasized heading',
	() => checkRelevanceForText('# *some* text', ['some'], 4)
    )

    test(
	'strong text',
	() => checkRelevanceForText('**some** text', ['some'], 2)
    )

    test('text with no keywords', () => {
	const result = buildAstForText('some text', ['no'])
	expect(result).toBeNull()
    })

    test('multiple words in search term', () => {
	checkRelevanceForText('some text', ['some text'], 1)
    })

    test('sample post', () => checkRelevanceForFile('simple-post.md', ['one'], 4))

    test(
	'sample post, varied case',
	() => checkRelevanceForFile('simple-post.md', ['paragraph'], 3)
    )
})
