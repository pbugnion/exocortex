import { takeEvery, all, put, cps } from 'redux-saga/effects'

import fs from 'fs'
import path from 'path'

import { MarkdownParser } from './services/markdown'

export const APP_START = 'APP_START'
export const RECEIVED_POST_LIST = 'RECEIVED_POST_LIST'
export const RECEIVED_POST_CONTENTS = 'RECEIVED_POST_CONTENTS'
export const RECEIVED_POST_AST = 'RECEIVED_POST_AST'

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
    }
}

export default function* appSagas() {
    yield all([
	watchAppStartup()
    ])
}
