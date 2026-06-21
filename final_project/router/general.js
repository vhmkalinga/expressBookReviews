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

// Task 10
public_users.get('/promise/books', async function(req,res){
    const data = await Promise.resolve(books);
    return res.status(200).json(data);
  });
  
  // Task 11
  public_users.get('/promise/isbn/:isbn', async function(req,res){
    const isbn = req.params.isbn;
    const data = await Promise.resolve(books[isbn]);
    return res.status(200).json(data);
  });
  
  // Task 12
  public_users.get('/promise/author/:author', async function(req,res){
    const author = req.params.author;
  
    const data = await Promise.resolve(
      Object.values(books).filter(
        (book)=>book.author === author
      )
    );
  
    return res.status(200).json(data);
  });
  
  // Task 13
  public_users.get('/promise/title/:title', async function(req,res){
    const title = req.params.title;
  
    const data = await Promise.resolve(
      Object.values(books).filter(
        (book)=>book.title === title
      )
    );
  
    return res.status(200).json(data);
  });