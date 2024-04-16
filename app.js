import { ServerConfig } from './src/config/server/server.config.js';
import exppress from 'express';
import cors from 'cors';
import { ValidateRequest } from './src/middleware/validate-request.js';
import userRouter from './src/routes/v1/user.router.js';
import { connectionDB } from './src/config/database/mongo.connection.js';

const Server = new ServerConfig(exppress());
Server.routes(userRouter);
Server.middlewares(cors, ValidateRequest);
connectionDB()
  .then(() => Server.listen(3000))
  .catch((error) => console.error(error));
