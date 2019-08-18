import * as React from 'react';
import * as style from './styles.css';

interface IProps {
  onSubmit: (e: any) => void;
  onChange: (value: string) => void;
}

export const SearchBooks:React.SFC<IProps> = (props) => (
  <form onSubmit={(e) => props.onSubmit(e)} className={style.searchContainer}>
      <input
        type='text'
        className={style.input}
        placeholder='Search books'
        onChange={(event) => props.onChange(event.target.value)}
        required
      />
    </form>
);