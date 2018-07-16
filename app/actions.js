import { takeEvery, all } from 'redux-saga/effects'

export const APP_START = 'APP_START'

function* watchAppStartup() {
    yield takeEvery(APP_START, appStart)
}

function* appStart() {
    console.log('hello in saga')
}

export default function* appSagas() {
    yield all([
	watchAppStartup()
    ])
}
