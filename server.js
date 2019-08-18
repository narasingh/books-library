const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');

const books = require('./routes/api/books');

const app = express();

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware:
app.use(passport.initialize());

// Use Routes:
app.use('/api/books', books);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));