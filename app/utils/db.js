"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: 'root',
    password: 'root',
    database: 'kubify_get_org_chart',
    connectionLimit: 5,
});
const query = (q, params) => __awaiter(this, void 0, void 0, function* () {
    const conn = yield pool.getConnection();
    const result = yield conn.query(q, params);
    if (conn)
        conn.end();
    if ('affectedRows' in result) {
        return [];
    }
    return result.map(row => row);
});
exports.query = query;
const data_table = new class {
    constructor() {
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = 'SELECT data FROM data_table WHERE secId = ?';
            return yield query(q, [id]);
        });
    }
    getAll(columns = ["secId", "data"]) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `SELECT ${columns.map(a => "`" + a + "`").join(', ')} FROM data_table`;
            return yield query(q, []);
        });
    }
    set(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = 'UPDATE data_table SET data = ? WHERE secId = ?';
            return yield query(q, [JSON.stringify(data), id]);
        });
    }
    setOrAdd(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield this.get(id);
            if (!res[0]) {
                yield this.add(id, data);
            }
            else {
                yield this.set(id, data);
            }
            return yield this.get(id);
        });
    }
    add(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let q = 'INSERT INTO data_table(secId, data) VALUES(?, ?)';
            return yield query(q, [id, JSON.stringify(data)]);
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            const q = `
          CREATE TABLE IF NOT EXISTS data_table (
            id MEDIUMINT NOT NULL AUTO_INCREMENT,
            secId TEXT NOT NULL,
            data TEXT,
            PRIMARY KEY (id)
          );
        `;
            return yield query(q, []);
        });
    }
};
exports.data_table = data_table;
data_table.init();
//# sourceMappingURL=db.js.map