const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory book storage with sample data
let books = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A classic American novel set in the Jazz Age, exploring themes of wealth, love, and the American Dream.',
    price: 12.99,
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400'
  },
  {
    id: '2',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A gripping tale of racial injustice and childhood innocence in the American South.',
    price: 14.99,
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400'
  },
  {
    id: '3',
    title: '1984',
    author: 'George Orwell',
    description: 'A dystopian social science fiction novel and cautionary tale about totalitarianism.',
    price: 13.99,
    coverImage: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400'
  }
];

// GET /books - Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// GET /books/:id - Get single book by ID
app.get('/books/:id', (req, res) => {
  const book = books.find(b => b.id === req.params.id);
  
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  
  res.json(book);
});

// POST /books - Add new book
app.post('/books', (req, res) => {
  const { title, author, description, price, coverImage } = req.body;
  
  // Basic validation
  if (!title || !author || !description || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  // Create new book with generated ID
  const newBook = {
    id: String(books.length + 1),
    title,
    author,
    description,
    price: parseFloat(price),
    coverImage: coverImage || 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400'
  };
  
  books.push(newBook);
  res.status(201).json(newBook);
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
