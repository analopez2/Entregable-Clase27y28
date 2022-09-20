import { Router } from 'express';
import { ServerResponse } from '../utils/server.response.js';
import { fork } from 'child_process';

const apiRandom = Router();

apiRandom.get('/', async (req, res) => {
  let cant = req.query.cant ?? 100000000;
  const result = fork('./src/child.process.js');
  result.send(cant);
  result.on('message', (values) => {
    res.send({
      data: values,
    });
  });
});

export default apiRandom;
