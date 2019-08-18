import { ViewBookModel } from 'app/models';
import { RouterState } from 'react-router-redux';

export interface RootState {
  books: RootState.BookState;
  router: RouterState;
}

export namespace RootState {
  export type BookState = ViewBookModel;
}
