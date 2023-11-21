import { Request, Response, NextFunction } from 'express';
import Author from '../models/Author';

const createAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    try {
        const author = await Author.create({
            name
        });
        return res.status(201).json({ author });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const readAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const { authorId } = req.params;
    try {
        const author = await Author.findById(authorId);

        return author ? res.status(200).json({ author }) : res.status(404).json({ message: 'Not found!' });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const readAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authors = await Author.find();

        return res.status(200).json({ authors });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const { authorId } = req.params;
    const { name } = req.body;
    try {
        const author = await Author.findByIdAndUpdate(
            authorId,
            {
                name: name
            },
            { new: true }
        );
        if (author) {
            return res.status(200).json({ author });
        } else {
            return res.status(404).json({ message: 'Not found!' });
        }
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const deleteAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const { authorId } = req.params;
    try {
        const author = await Author.findByIdAndDelete(authorId);
        if (author) {
            return res.status(201).json({ author });
        } else {
            return res.status(404).json({ message: 'Not found!' });
        }
    } catch (err) {
        return res.status(500).json({ err });
    }
};

export default { createAuthor, readAuthor, readAll, updateAuthor, deleteAuthor };
