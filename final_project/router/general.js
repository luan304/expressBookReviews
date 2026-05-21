const axios = require('axios');
const localURL = "http://localhost:5000";

// Lấy tất cả sách (Async/Await)
const getAllBooksAsync = async () => {
  try {
    const response = await axios.get(localURL + "/");
    console.log("Task 11 - All Books:", response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Lấy sách theo ISBN (Promise Callback)
const getBookByIsbnPromise = (isbn) => {
  axios.get(localURL + "/isbn/" + isbn)
    .then(response => console.log(`Task 11 - Book ISBN ${isbn}:`, response.data))
    .catch(error => console.error("Error:", error));
};

// Lấy sách theo Tác giả (Async/Await)
const getBookByAuthorAsync = async (author) => {
  try {
    const response = await axios.get(localURL + "/author/" + author);
    console.log(`Task 11 - Books by ${author}:`, response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

// Lấy sách theo Tiêu đề (Promise Callback)
const getBookByTitlePromise = (title) => {
  axios.get(localURL + "/title/" + title)
    .then(response => console.log(`Task 11 - Books titled ${title}:`, response.data))
    .catch(error => console.error("Error:", error));
};
