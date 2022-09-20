import { Router } from 'express';
import { config } from './../config/index.js';
import { ServerResponse } from '../utils/server.response.js';

const infoRouter = Router();

infoRouter.get('/', (req, res) => {
  const info = {
    args: config.Args,
    platformName: process.platform,
    nodeVersion: process.version,
    rss: process.memoryUsage(),
    path: process.execPath,
    pid: process.pid,
    cwd: process.cwd(),
  };
  res.render('info', { info });
});

export default infoRouter;
