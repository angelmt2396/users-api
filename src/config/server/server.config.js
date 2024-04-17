import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ValidateRequest } from '../../middleware/validate-request.js';
export class ServerConfig {
  constructor() {
    this.app = express();
    this.middlewares();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(ValidateRequest);
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
}
