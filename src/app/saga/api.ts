import axios from 'axios';
import { sortBy } from 'lodash';
import { BookModel } from '.././models';

export const fetchBooks = () => {
    return axios.get(`/api/books`)
        .then(res => {
            return sortBy(res.data, ['id']).reverse()
     }).catch(error => console.log(error));
}

export const addBooks = (payload: BookModel) => {
    return axios.post(`/api/books`, payload)
    .then(res => res.data)
    .catch(error => console.log(error));
}