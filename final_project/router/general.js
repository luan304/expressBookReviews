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
   TASK 11: IMPLEMENTATION USING AXIOS WITH ASYNC/AWAIT
   ========================================================= */
const axios = require('axios');
const localURL = "http://localhost:5000";

// Lấy tất cả sách (Async/Await)
const getAllBooksAsync = async () => {
  try {
    const response = await axios.get(localURL + "/");
    if (response.status === 200) {
      console.log("Task 11 - All Books:", response.data);
    }
  } catch (error) {
    console.error("Task 11 - Error fetching all books:", error.message);
  }
};

// Lấy sách theo ISBN (Promise Callback)
const getBookByIsbnPromise = (isbn) => {
  axios.get(localURL + "/isbn/" + isbn)
    .then(response => {
      if (response.status === 200) {
        console.log(`Task 11 - Book ISBN ${isbn}:`, response.data);
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        console.error(`Task 11 - Error: Book with ISBN ${isbn} not found.`);
      } else {
        console.error("Task 11 - Error fetching book by ISBN:", error.message);
      }
    });
};

// Lấy sách theo Tác giả (Async/Await)
const getBookByAuthorAsync = async (author) => {
  try {
    const response = await axios.get(localURL + "/author/" + author);
    if (response.status === 200) {
      console.log(`Task 11 - Books by ${author}:`, response.data);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error(`Task 11 - Error: Author '${author}' not found.`);
    } else {
      console.error("Task 11 - Error fetching books by author:", error.message);
    }
  }
};

// Lấy sách theo Tiêu đề (Promise Callback)
const getBookByTitlePromise = (title) => {
  axios.get(localURL + "/title/" + title)
    .then(response => {
      if (response.status === 200) {
        console.log(`Task 11 - Books titled ${title}:`, response.data);
      }
    })
    .catch(error => {
      if (error.response && error.response.status === 404) {
        console.error(`Task 11 - Error: Title '${title}' not found.`);
      } else {
        console.error("Task 11 - Error fetching books by title:", error.message);
      }
    });
};
