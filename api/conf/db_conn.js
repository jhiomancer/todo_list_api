const mysql = require("mysql");
const util = require("util");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'todo_list'
});

pool.query = util.promisify(pool.query);

module.exports = pool;