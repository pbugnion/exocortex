
import { SearchQuery } from './searchQuery'

describe('SearchQuery.splitIntoTerms', () => {
    test('single word', () => {
	expect(SearchQuery.splitIntoTerms('word')).toEqual(['word'])
    })

    test('multiple words', () => {
	expect(SearchQuery.splitIntoTerms('hello world'))
	    .toEqual(['hello', 'world'])
    })

    test('ignore multiple spaces', () => {
	expect(SearchQuery.splitIntoTerms('hello   world'))
	    .toEqual(['hello', 'world'])
    })

    test('ignore leading and trailing spaces', () => {
	expect(SearchQuery.splitIntoTerms('  hello world  '))
	    .toEqual(['hello', 'world'])
    })

    test('respect quotes', () => {
	expect(SearchQuery.splitIntoTerms('"hello world"'))
	    .toEqual(['hello world'])
    })

    test('mixed quoted and not quoted', () => {
	expect(SearchQuery.splitIntoTerms('"hello world" other word'))
	    .toEqual(['hello world', 'other', 'word'])
    })
})
