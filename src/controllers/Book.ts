import { Request, Response, NextFunction } from 'express';
import Book from '../models/Book';
import Author from '../models/Author';

const createBook = async (req: Request, res: Response, next: NextFunction) => {
    const { title, author } = req.body;
    try {
        const isAuthorExist = await Author.findById(author);

        if (isAuthorExist) {
            const book = await Book.create({
                title,
                author
            });
            return res.status(201).json({ book });
        } else {
            return res.status(404).json({ message: 'Author is not exist!' });
        }
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const readBook = async (req: Request, res: Response, next: NextFunction) => {
    const { bookId } = req.params;
    try {
        const book = await Book.findById(bookId).populate('author').select('-__v');

        return book ? res.status(200).json({ book }) : res.status(404).json({ message: 'Not found!' });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const books = await Book.find().populate('author').select('-__v');

        return res.status(200).json({ books });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    const { bookId } = req.params;
    const { title, author } = req.body;
    try {
        const book = await Book.findByIdAndUpdate(
            bookId,
            {
                title
            },
            { new: true }
        );
        if (book) {
            return res.status(200).json({ book });
        } else {
            return res.status(404).json({ message: 'Not found!' });
        }
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    const { bookId } = req.params;
    try {
        const book = await Book.findByIdAndDelete(bookId);
        if (book) {
            return res.status(201).json({ book });
        } else {
            return res.status(404).json({ message: 'Not found!' });
        }
    } catch (err) {
        return res.status(500).json({ err });
    }
};

export default { createBook, readBook, readAll, updateBook, deleteBook };
