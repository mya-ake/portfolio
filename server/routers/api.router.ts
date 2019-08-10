import { Router } from 'express';
import { apiController } from '../controllers';

export const apiRouter = Router();
apiRouter.use(apiController);
