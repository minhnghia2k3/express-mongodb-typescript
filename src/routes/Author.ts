import express from 'express';
import controllers from '../controllers/Author';
import { ValidateSchema, Schemas } from '../middlewares/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.author.create), controllers.createAuthor);
router.get('/get/:authorId', controllers.readAuthor);
router.get('/get', controllers.readAll);
router.patch('/update/:authorId', ValidateSchema(Schemas.author.update), controllers.updateAuthor);
router.delete('/delete/:authorId', controllers.deleteAuthor);

export default router;
