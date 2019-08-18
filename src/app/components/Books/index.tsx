import * as React from 'react';
import { BookModel } from './../../models';
import Book from '../Book';
import * as style from './styles.css';

interface IProps {
    books: BookModel[];
}

export const Books:React.SFC<IProps> = ({ books }) => {
    return (
        <div>
            <ul className={style.listing}>
                {
                    books.map(book => <Book key={book.id} {...book} />)
                }
            </ul>    
        </div>
    )
};