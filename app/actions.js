import { takeEvery, all, put, cps } from 'redux-saga/effects'

import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

import { MarkdownParser } from './services/markdown/parser'
import { Metadata } from './services/posts'

export const APP_START = 'APP_START'
export const RECEIVED_POST_LIST = 'RECEIVED_POST_LIST'
export const RECEIVED_POST_CONTENTS = 'RECEIVED_POST_CONTENTS'
export const RECEIVED_POST_AST = 'RECEIVED_POST_AST'
export const RECEIVED_POST_METADATA = 'RECEIVED_POST_METADATA'
export const FINISHED_LOADING_POSTS = 'FINISHED_LOADING_POSTS'

export const SEARCH_POSTS_FULL_TEXT = 'SEARCH_POSTS_FULL_TEXT'
export const CLEAR_SEARCH = 'CLEAR_SEARCH'

function* watchAppStartup() {
    yield takeEvery(APP_START, getPostList)
}

function* getPostList() {
    // TODO catch errors
    const directory = '/Users/pascal/exocortex'
    const files = yield cps(fs.readdir, directory)
    const paths = files.map(file => path.join(directory, file))
    yield put({ type: RECEIVED_POST_LIST, paths })
    for (let filePath of paths) {
	const contents = yield cps(fs.readFile, filePath, { encoding: 'utf-8' })
	yield put({ type: RECEIVED_POST_CONTENTS, filePath, contents })
	const ast = MarkdownParser.parse(contents)
	yield put({ type: RECEIVED_POST_AST, filePath, ast })
	const frontMatterNode = ast.children.find(({ type }) => type === 'yaml')
	if (typeof frontMatterNode !== 'undefined') {
	    const frontMatter = frontMatterNode.value
	    const loadedYaml = yaml.safeLoad(frontMatter)
	    const metadata = Metadata.fromFrontMatter(loadedYaml)
	    yield put({ type: RECEIVED_POST_METADATA, filePath, metadata })
	} else {
	    yield put({ type: RECEIVED_POST_METADATA, filePath, metadata: Metadata.default() })
	}
    }
    yield put({ type: FINISHED_LOADING_POSTS })
}

export function searchPostsFullText(searchQuery) {
    return { type: SEARCH_POSTS_FULL_TEXT, searchQuery }
}

export function clearSearch() {
    return { type: CLEAR_SEARCH }
}

export default function* appSagas() {
    yield all([
	watchAppStartup()
    ])
}
