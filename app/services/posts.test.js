
import { Tags } from './posts'

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
})
