
import { Tags, Metadata } from './posts'

describe('Tags.buildInvertedIndex', () => {
    test('single post', () => {
	const posts = {
	    '/path/1': {
		tags: ['first', 'second', 'third']
	    }
	}
	const tagIndex = Tags.buildTagInvertedIndex(posts)
	expect(tagIndex).toEqual({
	    'first': ['/path/1'],
	    'second': ['/path/1'],
	    'third': ['/path/1']
	})
    })

    test('multiple posts', () => {
	const posts = {
	    '/path/1': {
		tags: ['only-1', 'both']
	    },
	    '/path/2': {
		tags: ['both', 'only-2']
	    }
	}
	const tagIndex = Tags.buildTagInvertedIndex(posts)
	expect(tagIndex).toEqual({
	    'only-1': ['/path/1'],
	    'only-2': ['/path/2'],
	    'both': ['/path/1', '/path/2']
	})
    })

    test('post with no tags', () => {
	const posts = {
	    '/path/1': {
		tags: ['only-1']
	    },
	    '/path/2': {
		tags: []
	    }
	}
	const tagIndex = Tags.buildTagInvertedIndex(posts)
	expect(tagIndex).toEqual({
	    'only-1': ['/path/1']
	})
    })

    test('post with null tags', () => {
	const posts = {
	    '/path/1': {
		tags: ['only-1']
	    },
	    '/path/2': {
		tags: null
	    }
	}
	const tagIndex = Tags.buildTagInvertedIndex(posts)
	expect(tagIndex).toEqual({
	    'only-1': ['/path/1']
	})
    })

    test('post with missing tags field', () => {
	const posts = {
	    '/path/1': {
		tags: ['only-1']
	    },
	    '/path/2': {}
	}
	const tagIndex = Tags.buildTagInvertedIndex(posts)
	expect(tagIndex).toEqual({
	    'only-1': ['/path/1']
	})
    })

    test('post with badly-formed tags field', () => {
	const posts = {
	    '/path/1': {
		tags: ['only-1']
	    },
	    'second-post': {
		tags: 'not-an-array'
	    }
	}
	expect(() => Tags.buildTagInvertedIndex(posts))
	    .toThrow(/second-post/)
    })
})

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
})
