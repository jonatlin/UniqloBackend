const express = require('express');
const oracledb = require('oracledb');
const dotenv = require('dotenv');
dotenv.config({
    path: '.env'
});


async function init() {
    try {
        // Create a connection pool which will later be accessed via the
        // pool cache as the 'default' pool.
        await oracledb.createPool({
            user: process.env.DB_USER,
                password: process.env.DB_PASS,
                connectString: process.env.DB_CONNECTION 
        });
        console.log('Connection pool started');

        // Now the pool is running, it can be used
        await dostuff();

    } catch (err) {
        console.error('init() error: ' + err.message);
    } finally {
        await closePoolAndExit();
    }
}

async function dostuff() {
    let connection;
    try {
        console.log("trying to get connection");
        // Get a connection from the default pool
        connection = await oracledb.getConnection();
        const sql = `SELECT * FROM PRODUCT_ITEM`;
        const binds = [1];
        const options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        };
        const result = await connection.execute(sql, binds, options);
        console.log(result);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                // Put the connection back in the pool
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}

async function closePoolAndExit() {
    console.log('\nTerminating');
    try {
        // Get the pool from the pool cache and close it when no
        // connections are in use, or force it closed after 10 seconds
        // If this hangs, you may need DISABLE_OOB=ON in a sqlnet.ora file
        await oracledb.getPool().close(10);
        console.log('Pool closed');
        process.exit(0);
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

// process
//     .once('SIGTERM', closePoolAndExit)
//     .once('SIGINT', closePoolAndExit);

init();

const app = express();

app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), () => {
    console.log('express is listening on port: ' + app.get('port'));
});