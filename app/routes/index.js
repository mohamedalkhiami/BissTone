'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const basicAuth = require("express-basic-auth");
const db_1 = require("../utils/db");
const router = express.Router();
router.get('/', basicAuth({
    users: { root: 'root' },
    challenge: true,
    realm: 'Imb4T3st4pp',
}), (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let id = req.params.id;
    let data = yield db_1.data_table.getAll(["secId"]);
    data = data.map(a => a.secId);
    console.log(typeof data, data);
    res.render('all', { data });
}));
router.get('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let id = req.params.id;
    let data = yield db_1.data_table.get(id);
    console.log(typeof data, data[0]);
    res.render('index', { id, data: (data[0] && data[0].data) });
}));
router.post('/:id', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let id = req.params.id;
    yield db_1.data_table.setOrAdd(id, req.body);
    res.send({
        exitcode: 0,
        status: 200,
        body: "Done"
    });
}));
exports.default = router;
//# sourceMappingURL=index.js.map