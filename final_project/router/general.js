const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Task 7: Register a new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    // Check if user already exists
    const doesExist = users.filter((user) => user.username === username);
    if (doesExist.length > 0) {
      return res.status(400).json({ message: "User already exists!" });
    } else {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User " + username + " successfully registered. Now you can login" });
    }
  }
  return res.status(400).json({ message: "Unable to register user. Username and password are required." });
});

// Task 2: Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).json({ books: books });
});

// Task 3: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Task 4: Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const booksByAuthor = [];
  const keys = Object.keys(books);

  keys.forEach((key) => {
    if (books[key].author === author) {
      booksByAuthor.push({
        isbn: key,
        title: books[key].title,
        reviews: books[key].reviews
      });
    }
  });

  if (booksByAuthor.length > 0) {
    return res.status(200).json({ booksbyauthor: booksByAuthor });
  } else {
    return res.status(404).json({ message: "Author not found" });
  }
});

// Task 5: Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const booksByTitle = [];
  const keys = Object.keys(books);

  keys.forEach((key) => {
    if (books[key].title === title) {
      booksByTitle.push({
        isbn: key,
        author: books[key].author,
        reviews: books[key].reviews
      });
    }
  });

  if (booksByTitle.length > 0) {
    return res.status(200).json({ booksbytitle: booksByTitle });
  } else {
    return res.status(404).json({ message: "Title not found" });
  }
});

// Task 6: Get book review based on ISBN
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;


/* =========================================================
   TASK 11: IMPLEMENTATION USING AXIOS WITH ASYNC/AWAIT & PROMISES
   ========================================================= */
const axios = require('axios');

// 1. Get all books (Async/Await)
const getAllBooks = async () => {
  try {
    const response = await axios.get("http://localhost:5000/");
    console.log("All Books:", response.data);
  } catch (error) {
    console.error("Error fetching all books:", error);
  }
};

// 2. Get book by ISBN (Promises)
const getBookByISBN = (isbn) => {
  axios.get("http://localhost:5000/isbn/" + isbn)
    .then(response => {
      console.log("Book details by ISBN:", response.data);
    })
    .catch(error => {
      console.error("Error fetching book by ISBN:", error);
    });
};

// 3. Get book by Author (Async/Await)
const getBookByAuthor = async (author) => {
  try {
    const response = await axios.get("http://localhost:5000/author/" + author);
    console.log("Book details by Author:", response.data);
  } catch (error) {
    console.error("Error fetching book by Author:", error);
  }
};

// 4. Get book by Title (Promises)
const getBookByTitle = (title) => {
  axios.get("http://localhost:5000/title/" + title)
    .then(response => {
      console.log("Book details by Title:", response.data);
    })
    .catch(error => {
      console.error("Error fetching book by Title:", error);
    });
};

getAllBooks();
getBookByISBN("1");
getBookByAuthor("Chinua Achebe");
getBookByTitle("Things Fall Apart");
