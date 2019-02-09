const mariadb = require('mariadb');
// Optimally these are defined in a secret storage like Ansible Vault, AWS Secrets Manager, etc.
const pool = mariadb.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: 'root',
    password: 'root',
    database: 'kubify_get_org_chart',
    connectionLimit: 5,
});

const query = async (q: string, params: any[]): Promise<any[]> => {
    const conn = await pool.getConnection();
    const result = await conn.query(q, params);
    if (conn) conn.end();
    // When doing INSERT, UPDATE
    if ('affectedRows' in result) {
        return [];
    }
    return result.map(row => row);
};
const data_table = new class {
    constructor() {

    }
    async get(id: string): Promise<any[]> {
        const q = 'SELECT data FROM data_table WHERE secId = ?';
        return await query(q, [id]);
    }
    async getAll(columns = ["secId", "data"]): Promise<any[]> {
        const q = `SELECT ${columns.map(a => "`" + a + "`").join(', ')} FROM data_table`;
        return await query(q, []);
    }
    async set(id: string, data: {
        [k: string]: any
    }): Promise<any[]> {
        const q = 'UPDATE data_table SET data = ? WHERE secId = ?';
        return await query(q, [JSON.stringify(data), id]);
    }
    async setOrAdd(id: string, data: {
        [k: string]: any
    }): Promise<any[]> {
        let res = await this.get(id)
        if (!res[0]) {
            await this.add(id, data)
        } else {
            await this.set(id, data)
        }
        return await this.get(id)
    }
    async add(id, data: {
        [k: string]: any
    }): Promise<any[]> {
        let q = 'INSERT INTO data_table(secId, data) VALUES(?, ?)'
        return await query(q, [id, JSON.stringify(data)]);
    }
    // async add(data: {
    //     [k: string]: any
    // }): Promise<any[]> {
    //     const q = 'UPDATE data SET data=? WHERE id==?';
    //     return await query(q, [JSON.stringify(data), id]);
    // }

    async init(): Promise<any[]> {
        const q = `
          CREATE TABLE IF NOT EXISTS data_table (
            id MEDIUMINT NOT NULL AUTO_INCREMENT,
            secId TEXT NOT NULL,
            data TEXT,
            PRIMARY KEY (id)
          );
        `;
        return await query(q, []);
    }
}
data_table.init()
export {
    query,
    data_table
};