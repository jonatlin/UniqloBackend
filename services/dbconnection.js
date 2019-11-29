const oracledb = require('oracledb');

exports.createPool = async() => {

    await oracledb.createPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        connectString: process.env.DB_CONNECTION,
        poolMax: 10
    });

}

exports.closePool = async() => {

    await oracledb.getPool().close();
}