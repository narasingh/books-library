import axios from 'axios';


export const fetchBooks = () => {
    return axios.get(`/api/books`)
        .then(res => {
        return res.data;
        }).catch(error => console.log(error));
}