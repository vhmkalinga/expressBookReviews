const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {

const username = req.body.username;
const password = req.body.password;

if (!username || !password) {
return res.status(404).json({
message: "Username and password required"
});
}

if (!isValid(username)) {
users.push({
username: username,
password: password
});


return res.status(200).json({
  message: "User successfully registered. Now you can login"
});


}

return res.status(404).json({
message: "User already exists!"
});
});

// Task 1 - Get all books
public_users.get('/', function (req, res) {
return res.status(200).send(JSON.stringify(books, null, 4));
});

// Task 2 - Get book by ISBN
public_users.get('/isbn/:isbn', function (req, res) {

const isbn = req.params.isbn;

return res.status(200).json(books[isbn]);
});

// Task 3 - Get books by author
public_users.get('/author/:author', function (req, res) {

const author = req.params.author;
let filteredBooks = {};

Object.keys(books).forEach((key) => {
if (books[key].author === author) {
filteredBooks[key] = books[key];
}
});

return res.status(200).json(filteredBooks);
});

// Task 4 - Get books by title
public_users.get('/title/:title', function (req, res) {

const title = req.params.title;
let filteredBooks = {};

Object.keys(books).forEach((key) => {
if (books[key].title === title) {
filteredBooks[key] = books[key];
}
});

return res.status(200).json(filteredBooks);
});

// Task 5 - Get reviews
public_users.get('/review/:isbn', function (req, res) {

const isbn = req.params.isbn;

return res.status(200).json(books[isbn].reviews);
});

// Task 10 - Get all books using async/await
public_users.get('/async/books', async (req, res) => {
try {
const response = await axios.get('http://localhost:5000/');
return res.status(200).json(response.data);
} catch (err) {
return res.status(500).json(err.message);
}
});

// Task 11 - Get book by ISBN using async/await
public_users.get('/async/isbn/:isbn', async (req, res) => {
try {
const isbn = req.params.isbn;


const response = await axios.get(
  `http://localhost:5000/isbn/${isbn}`
);

return res.status(200).json(response.data);


} catch (err) {
return res.status(500).json(err.message);
}
});

// Task 12 - Get books by author using async/await
public_users.get('/async/author/:author', async (req, res) => {
try {
const author = req.params.author;


const response = await axios.get(
  `http://localhost:5000/author/${author}`
);

return res.status(200).json(response.data);


} catch (err) {
return res.status(500).json(err.message);
}
});

// Task 13 - Get books by title using async/await
public_users.get('/async/title/:title', async (req, res) => {
try {
const title = req.params.title;


const response = await axios.get(
  `http://localhost:5000/title/${title}`
);

return res.status(200).json(response.data);


} catch (err) {
return res.status(500).json(err.message);
}
});

module.exports.general = public_users;
