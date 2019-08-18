const express = require('express');
const router = express.Router();
const Store = require('data-store');
const store = new Store('app', { path: __dirname + '/data.json', debounce: 10 });
const books = require('./data').books;

// @route GET api/books
// @description Get All Books
// @access Public
router.get('/', (req, res) => {
  res.json(books)
});

router.post('/', (req, res) => {
  const payload = req.body.payload;
  const data = books;

  const reqData = {
      id: data.reduce(function(max, book) {
        return Math.max(book.id || 1, max);
      }, 0) + 1,
      isbn: '1932394699',
      title: payload.title,
      shortDescription: payload.shortDescription,
      longDescription: payload.shortDescription,
      status:  payload.status,
      categories: payload.categories,
      pageCount: payload.pageCount,
      publishedDate: new Date(),
      thumbnailUrl: 'https://s3.amazonaws.com/AKIAJC5RLADLUMVRPFDQ.book-thumb-images/ableson.jpg',
  };
  console.log(reqData);
  books.push(reqData);
  store.set('books', books); 
  res.json({ message: 'data added' });
});

module.exports = router;