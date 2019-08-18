import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { BookModel } from '../models';
import { BookActions } from '../actions';

const initialSate: RootState.BookState = {
    inProgress: false,
    list: [],
    error: undefined,
};

export const bookReducer = handleActions<RootState.BookState, BookModel>({
    [BookActions.Type.ADD_BOOK]: (state, action) => {
            if (action.payload) {
                const { title, shortDescription, longDescription, status, categories } = action.payload;
               return {
                   ...state,
                   inProgress: true,
                   list: [
                        {
                            id: state.list.reduce((max, book) => Math.max(book.id || 1, max), 0) + 1,
                            isbn: (state.list.reduce((max, book) => Math.max(~~book.isbn || 1, max), 0) + 1).toString(),
                            title,
                            shortDescription,
                            longDescription,
                            status,
                            categories,
                            pageCount: 100,
                            publishedDate: new Date(),
                            thumbnailUrl: 'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg',
                        },
                        ...state.list,
                   ]
               }
            } else {
                return state;
            }
    },
    [BookActions.Type.ADD_BOOK_FAIL]: (state, action) => {
        return {
            ...state,
            error: action.payload
        }
    },
    [BookActions.Type.FETCH_ALL_BOOKS]: (state, action) => ({
        ...state,
        inProgress: true,
        error: undefined
    }),
    [BookActions.Type.FETCH_ALL_BOOKS_SUCCESS]: (state, action) => {
        return {
            ...state,
            list: action.payload as any,
            inProgress: false,
        };
    },
    [BookActions.Type.FETCH_ALL_BOOKS_FAIL]: (state, aciton) => ({
        ...state,
        inProgress: false,
        error: aciton.payload
    })

},initialSate);