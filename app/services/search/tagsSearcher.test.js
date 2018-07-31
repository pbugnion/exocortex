
import { TagsSearcher } from './tagsSearcher'

function postWithTags(tags) {
    const post = {
	metadata: {
	    tags
	}
    }
    return post
}

describe('TagsSearch.searchTags', () => {
    test('matching term', () => {
	const post = postWithTags(['hello', 'world'])
	expect(TagsSearcher.searchTags(post, 'hello')).toEqual(1.0)
    })

    test('no matching terms', () => {
	const post = postWithTags(['hello', 'world'])
	expect(TagsSearcher.searchTags(post, 'other')).toEqual(0.0)
    })

    test('duplicate tags', () => {
	const post = postWithTags(['hello', 'hello'])
	expect(TagsSearcher.searchTags(post, 'hello')).toEqual(1.0)
    })

    test('no tags', () => {
	const post = postWithTags([])
	expect(TagsSearcher.searchTags(post, 'hello')).toEqual(0.0)
    })

    test('match with different case', () => {
	const post = postWithTags(['hello'])
	expect(TagsSearcher.searchTags(post, 'HELLO')).toEqual(1.0)
    })

    test('malformed metadata', () => {
	const post = {
	    metadata: {}
	}
	expect(TagsSearcher.searchTags(post, 'hello')).toEqual(0.0)
    })

    test('malformed post', () => {
	const post = {}
	expect(TagsSearcher.searchTags(post, 'hello')).toEqual(0.0)
    })
})
