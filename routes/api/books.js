const express = require('express');
const router = express.Router();
const books = require('../data');

// @route GET api/books
// @description Get All Books
// @access Public
router.get('/', (req, res) => {
  res.json(books)
});

module.exports = router;