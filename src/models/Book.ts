import mongoose, { Schema, Document } from 'mongoose';

export interface IBook {
    title: string;
    author: string;
}

export interface IBookModel extends IBook, Document {}

const BookSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' }
    },
    { timestamps: true }
);

export default mongoose.model<IBookModel>('Book', BookSchema);
