import { ServerConfig } from './config/server/server.config.js';
import { connectionDB } from './config/database/mongo.connection.js';
import environment from './config/environment/index.js';
const Server = new ServerConfig();
console.log('here');
connectionDB()
  .then(() => {
    Server.listen(environment.PORT);
  })
  .catch((error) => console.error(error));
export const handler = Server.returnSrv();
