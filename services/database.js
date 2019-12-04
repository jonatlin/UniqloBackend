const oracledb = require('oracledb');

exports.createPool = async () => {
    
    await oracledb.createPool({
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        connectString: process.env.DB_CONNECTION,
        poolMax: 10
    });
    
};

exports.closePool = async () => {
    
    await oracledb.getPool().close();
};

exports.query = async (sql, binds = [], options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT
}) => {
    try {
        connection = await oracledb.getConnection();
        console.log("connected");
        
        result = await connection.execute(sql, binds, options);
        console.log(result);
        
    }
    catch (err) {
        console.log(err);
    } finally {
        if (connection) {
            try {
                console.log("closing the connection");
                // Release the connection back to the connection pool
                await connection.close();
                
                console.log("returning result");
                return result;
                
            } catch (err) {
                console.error(err);
            }
        }
        
        return {
            "error": "unable to retrieve data"
        };
        
    }
};
