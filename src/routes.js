import { Router } from 'express';

import TokenController from './app/controllers/TokenController';

const routes = new Router();

routes.get('/token', TokenController.store);

export default routes;
