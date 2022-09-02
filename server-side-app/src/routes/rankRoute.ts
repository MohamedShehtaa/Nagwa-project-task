import { Router } from 'express';
import { getRank } from '../controllers/rankController';

const rankRouter = Router();

rankRouter.post('/', getRank);

export default rankRouter;
