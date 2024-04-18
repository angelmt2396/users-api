import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import serverless from 'serverless-http';
import { ValidateRequest } from '../../middleware/validate-request.js';
import userRouter from '../../routes/v1/user.router.js';
import { basicAuth } from '../../middleware/basic-auth.js';
export class ServerConfig {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes(userRouter);
    this.srv = serverless(this.app);
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(ValidateRequest);
    this.app.use(basicAuth);
    this.app.use(helmet());
  }

  routes(userRouter) {
    this.app.use('', userRouter);
  }

  listen(port) {
    this.app.listen(port, () => {
      console.log(`server ON in port: ${port}`);
    });
  }

  returnSrv() {
    return this.srv;
  }
}
