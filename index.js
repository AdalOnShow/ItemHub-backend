const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory book storage with sample data
let books = [
  {
    id: "1",
    title: "Clean Code",
    author: "Robert C. Martin",
    description:
      "A Handbook of Agile Software Craftsmanship. Learn how to write code that is easy to read and maintain.",
    price: 34.99,
    coverImage:
      "https://ia801705.us.archive.org/view_archive.php?archive=/29/items/l_covers_0008/l_covers_0008_74.zip&file=0008740839-L.jpg",
  },
  {
    id: "2",
    title: "Pragmatic Programmer",
    author: "Andrew Hunt & David Thomas",
    description:
      "Your journey to mastery. One of the most significant books in software development.",
    price: 39.99,
    coverImage:
      "https://covers.openlibrary.org/b/id/15111148-L.jpg",
  },
  {
    id: "3",
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    description:
      "Uncovering the beautiful, elegant, highly expressive, and enlightened parts of JavaScript.",
    price: 24.99,
    coverImage:
      "https://covers.openlibrary.org/b/id/9245523-L.jpg",
  },
  {
    id: "4",
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    description:
      "A modern introduction to programming, focusing on JavaScript and the web.",
    price: 29.99,
    coverImage:
      "https://covers.openlibrary.org/b/id/12995869-L.jpg",
  },
  {
    id: "5",
    title: "Design Patterns",
    author: "Erich Gamma et al.",
    description:
      "Elements of Reusable Object-Oriented Software. The foundation for modern software design.",
    price: 49.99,
    coverImage:
      "https://covers.openlibrary.org/b/id/5950339-L.jpg",
  },
  {
    id: "6",
    title: "Refactoring",
    author: "Martin Fowler",
    description:
      "Improving the Design of Existing Code. A classic guide to improving software design.",
    price: 44.99,
    coverImage:
      "https://covers.openlibrary.org/b/id/10527062-L.jpg",
  },
  {
    id: "7",
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    description:
      "An in-depth guide to the core mechanisms of the JavaScript language.",
    price: 19.99,
    coverImage:
      "https://covers.openlibrary.org/b/id/10579162-L.jpg",
  },
  {
    id: "8",
    title: "The Mythical Man-Month",
    author: "Frederick P. Brooks Jr.",
    description:
      "Essays on Software Engineering. A timeless classic on managing complex projects.",
    price: 32.99,
    coverImage:
      "https://covers.openlibrary.org/b/id/10653425-L.jpg",
  },
  {
    id: "9",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    description:
      "A comprehensive guide to algorithms, covering a wide range of topics in depth.",
    price: 89.99,
    coverImage:
      "https://covers.openlibrary.org/b/id/6709987-L.jpg",
  },
  {
    id: "10",
    title: "Cracking the Coding Interview",
    author: "Gayle Laakmann McDowell",
    description:
      "189 Programming Questions and Solutions to help you ace your next technical interview.",
    price: 36.99,
    coverImage:
      "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400",
  },
];

// GET /books - Get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// GET /books/:id - Get single book by ID
app.get("/books/:id", (req, res) => {
  const book = books.find((b) => b.id === req.params.id);

  if (!book) {
    return res.status(404).json({ error: "Book not found" });
  }

  res.json(book);
});

// POST /books - Add new book
app.post("/books", (req, res) => {
  const { title, author, description, price, coverImage } = req.body;

  // Basic validation
  if (!title || !author || !description || !price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Create new book with generated ID
  const newBook = {
    id: String(books.length + 1),
    title,
    author,
    description,
    price: parseFloat(price),
    coverImage:
      coverImage ||
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
