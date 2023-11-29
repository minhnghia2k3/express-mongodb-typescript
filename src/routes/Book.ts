import express from 'express';
import controllers from '../controllers/Generic';
import model from '../models/Book';
import { Schemas, ValidateSchema } from '../middlewares/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.book.create), controllers.create(model));
router.get('/get/:id', controllers.get(model, ['author']));
router.get('/get', controllers.getAll(model, ['author']));
router.patch('/update/:id', ValidateSchema(Schemas.book.update), controllers.update(model));
router.delete('/delete/:id', controllers.deleteDocument(model));

export default router;
