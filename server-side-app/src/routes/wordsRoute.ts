import { Router } from 'express';
import { getWords } from '../controllers/wordsController';

const wordsRouter = Router();

wordsRouter.get('/', getWords);

export default wordsRouter;
