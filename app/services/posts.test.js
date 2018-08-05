
import { Metadata, MetadataParseError, Title, Summary } from './posts'

import { MarkdownParser } from './markdown/parser'

describe('metadata.fromFrontMatter', () => {
    test('full frontmatter', () => {
	const rawFrontMatter = {
	    tags: ['first', 'second'],
	    title: 'some-title'
	}
	expect(Metadata.fromFrontMatter(rawFrontMatter)).toEqual({
	    tags: ['first', 'second'],
	    title: 'some-title'
	})
    })

    test('no tags', () => {
	const rawFrontMatter = {
	    title: 'some-title'
	}
	expect(Metadata.fromFrontMatter(rawFrontMatter).tags).toEqual([])
    })

    test('empty tags', () => {
	const rawFrontMatter = {
	    tags: [],
	}
	expect(Metadata.fromFrontMatter(rawFrontMatter).tags).toEqual([])
    })

    test('bad tags', () => {
	const rawFrontMatter = {
	    tags: 'not-an-array'
	}
	expect(() => Metadata.fromFrontMatter(rawFrontMatter))
	    .toThrow(MetadataParseError)
    })

    test('no title', () => {
	const rawFrontMatter = {
	    tags: ['first', 'second']
	}
	expect(Metadata.fromFrontMatter(rawFrontMatter).title).toBeNull()
    })

    test('empty title', () => {
	const rawFrontMatter = {
	    title: ''
	}
	expect(Metadata.fromFrontMatter(rawFrontMatter).title).toEqual('')
    })

    test('bad title', () => {
	const rawFrontMatter = {
	    title: ['should', 'not', 'be', 'an', 'array']
	}
	expect(() => Metadata.fromFrontMatter(rawFrontMatter))
	    .toThrow(MetadataParseError)
    })
})

describe('Metadata.getMetadata', () => {
    test('existing metadata', () => {
	const post = {
	    metadata: {
		tags: ['some-tag'],
		title: 'some-title'
	    }
	}
	expect(Metadata.getMetadata(post)).toEqual(post.metadata)
    })

    test('no metadata', () => {
	expect(Metadata.getMetadata({})).toEqual({
	    tags: [],
	    title: null
	})
    })

    test('null metadata', () => {
	expect(Metadata.getMetadata({ metadata: null })).toEqual({
	    tags: [],
	    title: null
	})
    })
})

describe('Title.findOrFallback', () => {
    test('title in metadata', () => {
	const post = {
	    metadata: {
		title: 'some-title'
	    }
	}
	expect(Title.findOrFallback('path', post)).toEqual('some-title')
    })

    test('no title in metadata', () => {
	const post = {
	    metadata: {
		title: null
	    }
	}
	expect(Title.findOrFallback('path', post)).toEqual('path')
    })

    test('missing title field', () => {
	const post = {
	    metadata: {}
	}
	expect(Title.findOrFallback('path', post)).toEqual('path')
    })

    test('no metadata', () => {
	expect(Title.findOrFallback('path', {})).toEqual('path')
    })
})

describe('Summary.create', () => {
    const { summaryFixtures } = require('../../__test__/sampleTexts')
    test('multiple paragraphs', () => {
	const { text, expectedSummary } = summaryFixtures.multipleParagraphs
	const ast = MarkdownParser.parse(text)
	const post = { ast }
	expect(Summary.create(post)).toEqual(expectedSummary)
    })

    test('ignore third paragraph', () => {
	const text = ['one', 'two', 'three'].join('\n\n')
	const ast = MarkdownParser.parse(text)
	const post = { ast }
	expect(Summary.create(post)).toEqual(['one', 'two'])
    })

    test('paragraph with over 500 characters', () => {
	const { text, expectedSummary } = summaryFixtures.longParagraph
	const ast = MarkdownParser.parse(text)
	const post = { ast }
	expect(Summary.create(post)).toEqual(expectedSummary)
    })

    test('missing ast', () => {
	const post = {}
	expect(Summary.create(post)).toEqual('')
    })
})
