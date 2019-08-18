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
        addBooks: (formData: any) => void;
    }
    export interface IState {
        formData: BookModel;
    }
}

@connect(
    (state: RootState) => ({}),
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

    render() {
        return (
           <div className={style.normal}>
                <Header />
                <div className={style.topContainer}>
                    <div className={style.Row}>
                    <div className={style.Col}>
                        <button className={style.add} onClick={() => this.props.history.push('/')}>Back</button></div>
                    </div>
                </div>
                <form onSubmit={this.props.addBooks} className={style.addform}>
                    <label htmlFor="username">Enter username</label>
                    <input id="username" name="username" type="text" />

                    <label htmlFor="email">Enter your email</label>
                    <input id="username" name="username" type="text" />

                    <label htmlFor="birthdate">Enter your birth date</label>
                    <input id="birthdate" name="birthdate" type="text" />

                    <button type="submit" value="Submit" className={style.add}>Submit</button>
                </form>
                <Footer />
            </div>
        );
    }
}