
import { Tags, Metadata, MetadataParseError, Title } from './posts'

describe('Tags.buildInvertedIndex', () => {
    test('single post', () => {
	const posts = {
	    '/path/1': {
		metadata: {
		    tags: ['first', 'second', 'third']
		}
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
		metadata: {
		    tags: ['only-1', 'both']
		}
	    },
	    '/path/2': {
		metadata: {
		    tags: ['both', 'only-2']
		}
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
		metadata: {
		    tags: ['only-1']
		}
	    },
	    '/path/2': {
		metadata: {
		    tags: []
		}
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
		metadata: {
		    tags: ['only-1']
		}
	    },
	    '/path/2': {
		metadata: {
		    tags: null
		}
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
		metadata: {
		    tags: ['only-1']
		}
	    },
	    '/path/2': {
		metadata: {}
	    }
	}
	const tagIndex = Tags.buildTagInvertedIndex(posts)
	expect(tagIndex).toEqual({
	    'only-1': ['/path/1']
	})
    })

    test('post with missing metadata field', () => {
	const posts = {
	    '/path/1': {
		metadata: {
		    tags: ['only-1']
		}
	    },
	    'second-post': {}
	}
	expect(Tags.buildTagInvertedIndex(posts)).toEqual({
	    'only-1': ['/path/1']
	})
    })

    test('post with badly-formed tags field', () => {
	const posts = {
	    '/path/1': {
		metadata: {
		    tags: ['only-1']
		}
	    },
	    'second-post': {
		metadata: {
		    tags: 'not-an-array'
		}
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
