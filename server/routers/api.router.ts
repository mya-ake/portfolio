import { Router } from 'express';
import { postController } from '../controllers';

export const apiRouter = Router();
apiRouter.use('/posts/:slug', postController);
