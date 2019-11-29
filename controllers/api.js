


exports.test = async (req, res, next) => {

    return res.json({
        "test": ['Test', "test"]
    });

}

exports.getAllProducts = async (req, res, next) => {

    let connection;
    var result;

    try {
        connection = await oracledb.getConnection();
        console.log("connect");
        result = await connection.execute('SELECT * FROM PRODUCTS');

    } catch (err) {
        console.log(err);
    } finally {
        if (connection) {
            try {
                // Release the connection back to the connection pool
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
        return result;
    }

}