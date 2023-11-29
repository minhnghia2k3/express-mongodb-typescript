import express from 'express';
import controllers from '../controllers/Generic';
import model from '../models/Author';
import { ValidateSchema, Schemas } from '../middlewares/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.author.create), controllers.create(model));
router.get('/get/:id', controllers.get(model));
router.get('/get', controllers.getAll(model));
router.patch('/update/:id', ValidateSchema(Schemas.author.update), controllers.update(model));
router.delete('/delete/:id', controllers.deleteDocument(model));

export default router;
