import * as React from 'react';
import * as style from './style.css';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { BookActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import { BookModel } from '../../models';
import { Header, Footer, Books, SearchBooks } from 'app/components';

export namespace App {
  export interface IProps extends RouteComponentProps<void> {
    books: BookModel[];
    inProgress: boolean;
    actions: BookActions;
    error?: object | undefined;
  }
  export interface IState {
    books: BookModel[];
    search: string | null;
  }
}

@connect(
  (state: RootState): Pick<App.IProps, 'books' | 'inProgress' | 'error'> => {
    return {
      books: state.books.list,
      inProgress: state.books.inProgress,
      error: state.books.error
    };
  },
  (dispatch: Dispatch): Pick<App.IProps, 'actions'> => ({
    actions: bindActionCreators(omit(BookActions, 'Type'), dispatch)
  })
)
export class App extends React.Component<App.IProps,App.IState> {

  static defaultProps: Partial<App.IProps> = {
    books: [],
    inProgress: false
  };

  static getDerivedStateFromProps(nextProps: any, prevState: App.IState) {
    if(nextProps.books !== prevState.books && nextProps.books.length && !prevState.search) {
      return {
         books: nextProps.books
      }
    }
    return null;
  }

  constructor(props: App.IProps, context?: any) {
    super(props, context);

    this.state = {
      books: props.books,
      search: null
    };
  }

  componentDidMount() {
    // trigger books actions
    this.props.actions.fetchAllBooks();
  }

  handleSearchSubmit = (event: React.FormEvent<HTMLInputElement>) => {
    event.preventDefault();
  }

  handleChangeSearch = (search: string) => {
    this.setState({ search }, this.filterBooks);
  }

  filterBooks = () => {
    const { search: searchText } = this.state;
    const searchTermArr =
      (searchText &&
        searchText
          .toString()
          .toLocaleLowerCase()
          .split(',')) ||
      [];
    let filterList = cloneDeep(this.props.books);

    if (searchTermArr.length) {
      filterList = filterList.filter(({ title = '', isbn = ''}) => {
        return searchTermArr.some((searchTerm) => {
          return (
            title.toLocaleLowerCase().includes(searchTerm.trim()) ||
            isbn.toLocaleLowerCase().includes(searchTerm.trim())
          );
        });
      });
    }
    this.setState({ books: filterList });
  }

  render() {
    const { inProgress } = this.props;
    const { books } = this.state;
    return (
      <div className={style.normal}>
        <Header />
          <div className={style.topContainer}>
            <div className={style.Row}>
              <div className={style.Col}> 
                <SearchBooks
                  onSubmit={(event) => this.handleSearchSubmit(event)}
                  onChange={(value) => this.handleChangeSearch(value)}
                />
              </div>
              <div className={style.Col}>
                <button className={style.add} onClick={() => this.props.history.push('/form')}>Add Book</button>
              </div>
            </div>
          </div>
          {inProgress ? 'Loading..' :
          <div className={style.container}>
            <Books books={books} />
          </div>}
        <Footer />
      </div>
    );
  }
}
