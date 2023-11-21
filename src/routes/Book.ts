import express from 'express';
import controllers from '../controllers/Book';
import { Schemas, ValidateSchema } from '../middlewares/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.book.create), controllers.createBook);
router.get('/get/:bookId', controllers.readBook);
router.get('/get', controllers.readAll);
router.patch('/update/:bookId', ValidateSchema(Schemas.book.update), controllers.updateBook);
router.delete('/delete/:bookId', controllers.deleteBook);

export default router;
