'use strict';

import * as express from 'express';
const router = express.Router();
let data = {};

/* GET home page. */
router.get('/:id', (req, res, next) => {
  let id = req.params.id;
  res.render('index', { id, data: JSON.stringify(data[id]) });
});

router.post('/:id', (req, res, next) => {
  let id = req.params.id;
  data[id] = req.body;
  res.send({
    exitcode: 0,
    status: 200,
    body: "Done"
  })
});

export default router;