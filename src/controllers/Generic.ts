import { Request, Response, NextFunction } from 'express';
import mongoose, { Document, Model } from 'mongoose';

// const create = (model) => (req:res:next) => {}

const create = (model: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Creating new document for ${model.modelName}`);
    try {
        const author = await model.create({
            ...req.body
        });
        return res.status(201).json({ author });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const getAll = (model: Model<any>, populate?: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Getting all documents for ${model.modelName}`);
    try {
        const result = await model.find<Document>().populate(populate || []);

        return res.status(200).json({ result });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const get = (model: Model<any>, populate?: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Getting documents for ${model.modelName} by id`);
    const { id } = req.params;
    try {
        const result = await model.findById<Document>(id).populate(populate || []);

        if (!result) {
            return res.status(404).json({ message: 'Not found!' });
        }

        return res.status(200).json({ result });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const update = (model: Model<any>, populate?: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Updating document for ${model.modelName} by id`);
    const { id } = req.params;
    try {
        const result = await model.findByIdAndUpdate<Document>(id, { ...req.body }, { new: true }).populate(populate || []);

        console.log('result: ', result);
        if (!result) {
            return res.status(404).json({ message: 'Not found!' });
        }

        return res.status(200).json({ result });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

const deleteDocument = (model: Model<any>) => async (req: Request, res: Response, next: NextFunction) => {
    console.log(`Delete a document for ${model.modelName} by id`);
    const { id } = req.params;
    try {
        const result = await model.findByIdAndDelete<Document>(id);

        if (!result) {
            return res.status(404).json({ message: 'Not found!' });
        }

        return res.status(200).json({ result });
    } catch (err) {
        return res.status(500).json({ err });
    }
};

export default { create, get, getAll, update, deleteDocument };
