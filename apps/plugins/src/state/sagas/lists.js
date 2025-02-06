import { put, takeEvery } from 'redux-saga/effects';
import { ActionTypes } from 'mirador';
import { addList, addSelectionToList, removeSelectionFromList, removeList, setLists, updateList } from '../reducers/lists';
import { db } from '../../data/db';

// Saga pour charger les bookmarks depuis localStorage
function* loadListsSaga() {
    try {
        const lists = yield db.lists.toArray();
        yield put({ type: setLists.type, payload: lists });
    } catch (e) {
        console.warn('Error loading lists from indexedDB', e);
    }
}

// Saga pour sauvegarder les bookmarks dans localStorage
function* saveListsSaga(action) {
    try {
        const { type, payload } = action;

        if(type == addList.type) {
            yield db.lists.add(payload.newList);
        } else if(type == removeList.type) {
            yield db.lists.delete(payload.listId);
        } else if(type == addSelectionToList.type) {
            const list = yield db.lists.get(payload.listId);
            list.content = [...list.content, ...payload.selection];
            yield db.lists.put(list);
        } else if(type == removeSelectionFromList.type) {
            const list = yield db.lists.get(payload.listId);            
            list.content = list.content.filter(item => !payload.idsToRemove.includes(item.id));
            yield db.lists.put(list);
        } else if(type == updateList.type) {
            const updatedList = payload.updatedList;            
            yield db.lists.update(updatedList.id, updatedList);
        }        
    } catch (e) {
        console.warn('Error saving lists to indexedDB', e);
    }
}

export default function* listsSaga() {
    yield takeEvery(ActionTypes.SET_CANVAS, loadListsSaga);
    yield takeEvery(ActionTypes.IMPORT_CONFIG, loadListsSaga);
    yield takeEvery(addList.type, saveListsSaga);
    yield takeEvery(removeList.type, saveListsSaga);
    yield takeEvery(addSelectionToList.type, saveListsSaga);
    yield takeEvery(removeSelectionFromList.type, saveListsSaga);
    yield takeEvery(updateList.type, saveListsSaga);
};
