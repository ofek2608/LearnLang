//
// This file will open a server on http://localhost:80
// It will send files in `page`
// It will send images in `data/photos`
// It will accept POST messages and redirect them to `api.executeApiRequest`
//

import express from 'express';
import { root } from './utils.js';
import { executeApiRequest } from './api.js';

const app = express();
const port = 80;

//TODO change to use raw so more is possible, and error handling is also good.
app.use(express.json());
// app.use(express.raw({type: '*/*'}));

function sendFile(file) {
  return async (req, res) => {
    res.set({
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
    });
    res.sendFile(file, {root: root + '/page'}, (error) => {
      if (error) {
        console.error(error);
        res.status(404).send('File not found');
      }
    });
  };
}

app.get('/', sendFile('index.html'));

const ALLOWED_PATHS = [
  '/js', '/style', '/images'
];

for (let path of ALLOWED_PATHS) {
  app.get(`${path}/:file`, async (req, res) => {
    const { file } = req.params;
    res.set({
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
    });
    res.sendFile(file, {root: `${root}/page${path}`}, (error) => {
      if (error) {
        res.status(404).send('File not found');
      }
    });
  });
}

app.post('/', async (req, res) => {
  res.set({
    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
  });
  let body = req.body;
  if (!body) {
    res.status(400).send({err:'missing body'});
    return;
  }
  let result;
  try {
    console.log('body',  body);
    result = executeApiRequest(body);
    if (result instanceof Promise) {
      result = await result;
    }
    console.log('result', result);
  } catch (err) {
    console.error(err);
    result = {err: 'internal error'};
  }
  if (result.err) {
    res.status(400);
  }
  res.send(result);
});


app.get('/img/:id', async (req, res) => {
  const { id } = req.params;
  res.set({
    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups'
  });
  res.sendFile(id + '.png', {root: root + '/data/photo'}, error => {
    if (error) {
      console.error(error);
      res.status(404).send('File not found');
    }
  });
});

//MUST BE LAST ROUTE
app.get('*', sendFile('redirect.html'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});