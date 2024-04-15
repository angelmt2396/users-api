export class ServerConfig {
  constructor(app) {
    this.app = app;
  }

  listen(port) {
    this.app.listen(port, () => {
      console.log(`server ON in port: ${port}`);
    });
  }
}
