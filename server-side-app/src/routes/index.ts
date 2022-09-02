import { Router } from 'express';
import rankRouter from './rankRoute';
import wordsRouter from './wordsRoute';

const indexRouter = Router();

indexRouter.use('/words', wordsRouter);
indexRouter.use('/rank', rankRouter);

export default indexRouter;
