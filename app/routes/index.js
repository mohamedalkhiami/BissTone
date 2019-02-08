'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const router = express.Router();
let data = {};
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
    });
});
exports.default = router;
//# sourceMappingURL=index.js.map