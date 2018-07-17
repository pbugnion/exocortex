import { takeEvery, all, put, cps } from 'redux-saga/effects'

import fs from 'fs'
import path from 'path'

export const APP_START = 'APP_START'
export const RECEIVED_POST_LIST = 'RECEIVED_POST_LIST'

function* watchAppStartup() {
    yield takeEvery(APP_START, getPostList)
}

function* getPostList() {
    // TODO catch errors
    const directory = '/Users/pascal/exocortex'
    const files = yield cps(fs.readdir, directory)
    const paths = files.map(file => path.join(directory, file))
    yield put({ type: RECEIVED_POST_LIST, paths })
}

export default function* appSagas() {
    yield all([
	watchAppStartup()
    ])
}
