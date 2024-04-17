import { ServerConfig } from './src/config/server/server.config.js';
import userRouter from './src/routes/v1/user.router.js';
import { connectionDB } from './src/config/database/mongo.connection.js';

const Server = new ServerConfig();
Server.routes(userRouter);
connectionDB()
  .then(() => Server.listen(3000))
  .catch((error) => console.error(error));
