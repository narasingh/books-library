import { createAction } from 'redux-actions';
import { BookModel } from '../models';


export namespace BookActions {
    export enum Type {
      ADD_BOOK = '[Books] add new book details',
      ADD_BOOK_FAIL = '[Books] add book details fail',
      EDIT_BOOK = '[Books] edit book details',
      EDIT_BOOK_FAIL = '[Books] edit book details fail',
      DELETE_BOOK = '[Books] delete book',
      DELETE_BOOK_FAIL = '[Books] delete book fail',
      FETCH_ALL_BOOKS = '[Books] fetch all books',
      FETCH_ALL_BOOKS_SUCCESS = '[Books] fetch all books success',
      FETCH_ALL_BOOKS_FAIL = '[Books] fetch all books fail',
    }
  
    export const addBook = createAction<BookModel>(Type.ADD_BOOK);
    export const editBook = createAction<PartialPick<BookModel, 'isbn'>>(Type.EDIT_BOOK);
    export const deleteBook = createAction<BookModel['isbn']>(Type.DELETE_BOOK);
    export const fetchAllBooks = createAction(Type.FETCH_ALL_BOOKS);
    export const fetchAllBooksSuccess = createAction(Type.FETCH_ALL_BOOKS_SUCCESS);
    export const fetchAllBooksFail = createAction(Type.FETCH_ALL_BOOKS_FAIL);
  }
  
export type BookActions = Omit<typeof BookActions, 'Type'>;