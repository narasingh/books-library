import * as React from 'react';
import Truncate from 'react-truncate';
import { BookModel } from '../../models';
import * as style from '../Books/styles.css';

const Book:React.SFC<BookModel> = ({
   id,
   isbn,
   title,
   pageCount,
   thumbnailUrl,
   shortDescription,
   categories,
}) => (
    <li>
        <h2>{title}</h2>
        <div className={style.body}>
            <img src={thumbnailUrl} />
            <p>
                <Truncate lines={2}>
                    {shortDescription}
                </Truncate>
            </p>
        </div>
        <div className={style.cta}><a href="" className={style.button}>Edit Book</a></div>
    </li>
);

export default Book;