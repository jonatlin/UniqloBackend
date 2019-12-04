const oracledb = require('oracledb');

exports.test = async (req, res, next) => {

    return res.json({
        "test": ['Test', "test"]
    });

}

exports.getAllProducts = async (req, res, next) => {

    let connection;
    var result;

    try {
        console.log("initiate connection");

        // await oracledb.createPool({
        //     user: process.env.DB_USER,
        //     password: process.env.DB_PASS,
        //     connectString: process.env.DB_CONNECTION,
        //     poolMax: 10
        // });

        // console.log("pool created");

        connection = await oracledb.getConnection();
        console.log("connected");
        const sql = `SELECT * FROM PRODUCT_ITEM`;
        const binds = [1];
        const options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        };
        const result = await connection.execute(sql);
        console.log(result);

    } catch (err) {
        console.log(err);
    } finally {
        if (connection) {
            try {
                console.log("closing the connection");
                // Release the connection back to the connection pool
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
        console.log("returning result");
        return result;
    }

}