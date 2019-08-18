import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { ViewBookModel } from '../models';
import { BookActions } from '../actions';

const initialSate: RootState.BookState = {
    inProgress: false,
    list: [],
    error: undefined,
    message: undefined,
};

export const bookReducer = handleActions<RootState.BookState, ViewBookModel>({
    [BookActions.Type.ADD_BOOK]: (state, action) => {
        return {
            ...state,
            inProgress: true,
            error: undefined,
            message: undefined,
        }
    },
    [BookActions.Type.ADD_BOOK_FAIL]: (state, action) => {
        return {
            ...state,
            error: action.payload,
            message: undefined,
        }
    },
    [BookActions.Type.ADD_BOOK_SUCCESS]: (state, action) => {
        return {
            ...state,
            inProgress: false,
            message: action.payload as any
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