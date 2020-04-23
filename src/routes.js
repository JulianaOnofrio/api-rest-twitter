import { Router } from 'express';
import UserController from './app/controllers/UserController';
import PostController from './app/controllers/PostController';
import CommentController from './app/controllers/CommentController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/users', UserController.index);
routes.get('/posts', PostController.index);
routes.get('/posts/:author', PostController.show);
routes.get('/:post_id/comments', CommentController.index);

routes.use(authMiddleware);

routes.put('/users', UserController.update);
routes.delete('/users', UserController.destroy);

routes.post('/posts', PostController.store);
routes.put('/posts/:_id', PostController.update);
routes.delete('/posts/:_id', PostController.destroy);

routes.post('/:post_id/comments', CommentController.store);
routes.put('/:post_id/comments/:comment_id', CommentController.update);
routes.delete('/:post_id/comments/:comment_id', CommentController.destroy);

export default routes;
