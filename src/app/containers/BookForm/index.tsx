import * as React from 'react';
import * as style from '../App/style.css';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps } from 'react-router';
import { BookActions } from 'app/actions';
import { RootState } from 'app/reducers';
import { omit } from 'app/utils';
import { BookModel, BookStatusModel } from '../../models';
import { Header, Footer } from 'app/components';

export namespace BookForm {
    export interface IProps extends RouteComponentProps<void> {
        actions: BookActions;
        message: string;
    }
    export interface IState {
        formData: BookModel;
    }
}

@connect(
    (state: RootState) => {
        return {
            message: state.books.message,
        }
    },
    (dispatch: Dispatch): Pick<BookForm.IProps, 'actions'> => ({
      actions: bindActionCreators(omit(BookActions, 'Type'), dispatch)
    })
)
export class BookForm extends React.Component<BookForm.IProps, BookForm.IState> {
    constructor(props: BookForm.IProps, context?: any) {
        super(props);

        this.state = {
            formData: {
                id: 0,
                title: '',
                isbn: '',
                shortDescription: '',
                longDescription: '',
                pageCount: 100,
                publishedDate: new Date(),
                status: BookStatusModel.PUBLISH,
                categories: ['Mobile Technology']
            }
        }
    }

    componentDidUpdate(prevProps: BookForm.IProps, prevState: BookForm.IState) {
        // only update chart if the data has changed
        if (prevProps.message !== this.props.message) {
           this.props.history.push('/');
        }
    }

    handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
       this.props.actions.addBook(this.state.formData);
       event.preventDefault();
    }

    changeHandler = ({ target }: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        const name = target.name;
        const value = target.value;
        
        this.setState({
            formData: {
                ...this.state.formData,
                [name]: value,
            }
        });
    }

    render() {
        const { title, pageCount, shortDescription } = this.state.formData;
        return (
           <div className={style.normal}>
                <Header />
                <div className={style.topContainer}>
                    <div className={style.Row}>
                    <div className={style.Col}>
                        <button className={style.add} onClick={() => this.props.history.push('/')}>Back</button></div>
                    </div>
                </div>
                <div className={style.container}>
                    <h3>Add Book</h3>
                    <form onSubmit={this.handleFormSubmit} className={style.addform}>
                        <label htmlFor="username">Title</label>
                        <input id="title" name="title" type="text" value={title} onChange={this.changeHandler} />

                        <label htmlFor="pageCount">Page count</label>
                        <input id="pageCount" name="pageCount" type="text" value={pageCount} onChange={this.changeHandler} />

                        <label htmlFor="shortDescription">Description</label>
                        <textarea id="shortDescription" name="shortDescription" onChange={this.changeHandler}>{shortDescription}</textarea>

                        <button type="submit" value="Submit" className={style.add}>Submit</button>
                    </form>
                </div>
                <Footer />
            </div>
        );
    }
}