import { ServerConfig } from './src/config/server/server.config.js';
import exppress from 'express';

const Server = new ServerConfig(exppress());
Server.listen(3000);
