import { takeEvery, all, put, cps } from 'redux-saga/effects'

import fs from 'fs'

export const APP_START = 'APP_START'

function* watchAppStartup() {
    yield takeEvery(APP_START, getPostList)
}

function* getPostList() {
    // TODO catch errors
    const files = yield cps(fs.readdir, '/Users/pascal/exocortex')
    yield put({ type: 'RECEIVED_POST_LIST', files })
}

export default function* appSagas() {
    yield all([
	watchAppStartup()
    ])
}
