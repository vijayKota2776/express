const Book = require('../modules/Books');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBook = async (req, res) => {
    try {
        if (req.user && req.user.role === 'STUDENT') {
            return res.status(403).json({ message: "Not authorized to create a book" });
        }

        const { title, author, publishedYear, price, quantity } = req.body;

        if (!title || !author || !publishedYear || !price || !quantity) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newBook = {
            title,
            author,
            publishedYear,
            price,
            quantity,
            status: "Available"
        };

        const book = new Book(newBook);
        await book.save();

        res.status(201).json({ message: "Book created successfully", data: book });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

const updateBook = async (req, res) => {
    try {
        if (req.user && req.user.role === 'STUDENT') {
            return res.status(403).json({ message: "Not authorized to update a book" });
        }

        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book updated successfully", data: book });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        if (req.user && req.user.role === 'STUDENT') {
            return res.status(403).json({ message: "Not authorized to delete a book" });
        }

        const book = await Book.findByIdAndDelete(req.params.id);
        
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};