const oracledb = require('oracledb');


exports.createPool = async () => {
    try {
        await oracledb.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            connectString: process.env.DB_CONNECTION,
            poolIncrement: 1,
            poolMin: 0,
            poolMax: 20,
            poolTimeout: 10,
            poolPingInterval: 10,
            queueTimeout: 0
        });
    } catch(err) {
        console.log(err);
    }
    console.log("connection pool created");
};

exports.closePool = async () => {
    
    await oracledb.getPool().close();
};

exports.resetPool = async () => {
    
    await this.closePool();
    await this.createPool();
    
}

exports.query = async (sql, binds = [], options = {
    outFormat: oracledb.OUT_FORMAT_OBJECT,
    timeout: 5
}, defaultRes = {"error": "unable to retrieve data"}) => {
    
    var connection;
    var result;
    
    
    
    try {
        console.log("establishing connection");
        connection = (await oracledb.getConnection());
        console.log("connected");
        connection.callTimeout(10000);
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
                if(result)
                return result;
                else
                return {"no result": "error"};
                
            } catch (err) {
                console.error(err);
            }
        } else {
            return defaultRes;
        }
    }
};
