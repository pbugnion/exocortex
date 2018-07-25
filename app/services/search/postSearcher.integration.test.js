
import path from 'path'
import fs from 'fs'

import { MarkdownParser } from '../markdown/parser'

import { PostSearcher } from './postSearcher'

describe('PostSearcher -- search real post', () => {
    function buildPostAst() {
	const pathInResources = 'simple-post.md'
	const postPath = path.join(__dirname, '../../../__test__/', pathInResources)
	const content = fs.readFileSync(postPath, { encoding: 'utf-8' })
	const ast = MarkdownParser.parse(content)
	return ast
    }

    test('single term', () => {
	const ast = buildPostAst()
	const post = { ast }
	expect(PostSearcher.searchPost(post, ['paragraph']))
	    .toEqual({ relevance: 3 })
    })

    test('multiple terms', () => {
	const ast = buildPostAst()
	const post = { ast }
	expect(PostSearcher.searchPost(post, ['one', 'paragraph']))
	    .toEqual({ relevance: 12 })
    })

    test('nonexistent term', () => {
	const ast = buildPostAst()
	const post = { ast }
	expect(PostSearcher.searchPost(post, ['one', 'paragraph', 'fjdslfjds']))
	    .toEqual({ relevance: 0 })
    })
})
