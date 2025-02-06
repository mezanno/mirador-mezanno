import { put, takeEvery, select } from 'redux-saga/effects';
import { addBookmark, removeBookmark, setBookmarks } from '../reducers/bookmarks';
import { ActionTypes } from 'mirador';
import { getBookmarks } from '../selectors/bookmarks';

// Saga pour charger les bookmarks depuis localStorage
function* loadBookmarksSaga() {
    try {
        const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        yield put({ type: setBookmarks.type, payload: bookmarks });
    } catch (e) {
        console.warn('Error loading bookmarks from localStorage', e);
    }
}

// Saga pour sauvegarder les bookmarks dans localStorage
function* saveBookmarksSaga(action) {
    try {
        const bookmarks = yield select(getBookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
        console.warn('Error saving bookmarks to localStorage', e);
    }
}

export default function* bookmarkSaga() {
    yield takeEvery(ActionTypes.SET_CANVAS, loadBookmarksSaga);
    yield takeEvery(addBookmark.type, saveBookmarksSaga);
    yield takeEvery(removeBookmark.type, saveBookmarksSaga);
};
