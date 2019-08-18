import { call, put, takeLatest } from 'redux-saga/effects'
import { all, fork } from 'redux-saga/effects';
import * as Api from './api';
import { omit } from '../utils';
import { BookActions } from '../actions';

const { fetchAllBooksSuccess, fetchAllBooksFail } = omit(BookActions, 'Type');
const { Type } = BookActions;

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchBooks() {
   try {
      const books = yield call(Api.fetchBooks);
      yield put(fetchAllBooksSuccess(books));
   } catch (e) {
      yield put(fetchAllBooksFail({ message: 'unnable to fetch books' }));
   }
}

export function* watchGetAllBooksAsync() {
    yield takeLatest(Type.FETCH_ALL_BOOKS, fetchBooks);
}

export default function* rootSaga() {
    yield all([
      fork(watchGetAllBooksAsync),
    ]);
}