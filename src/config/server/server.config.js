export class ServerConfig {
  constructor(app) {
    this.app = app;
  }

  middlewares(cors, validateRequest) {
    this.app.use(cors());
    this.app.use(validateRequest);
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
