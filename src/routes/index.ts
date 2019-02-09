'use strict';

import * as express from 'express';
import * as basicAuth from 'express-basic-auth'
import { data_table } from '../utils/db';
const router = express.Router();

/* GET home page. */
router.get('/', basicAuth({
  users: { root: 'root' },
  challenge: true,
  realm: 'Imb4T3st4pp',
}), async (req, res, next) => {
  let id = req.params.id;
  let data = await data_table.getAll(["secId"])
  data = data.map(a => a.secId)
  console.log(typeof data, data)
  res.render('all', { data });
});
/* GET home page. */
router.get('/:id', async (req, res, next) => {
  let id = req.params.id;
  let data = await data_table.get(id)
  console.log(typeof data, data[0])
  res.render('index', { id, data: (data[0] && data[0].data) });
});

router.post('/:id', async (req, res, next) => {
  let id = req.params.id;
  await data_table.setOrAdd(id, req.body)
  res.send({
    exitcode: 0,
    status: 200,
    body: "Done"
  })
});

export default router;