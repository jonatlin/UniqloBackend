const express = require('express');
const dotenv = require('dotenv');

// dotenv
dotenv.config({ path: '.env' });

// controllers
const apiController = require('./controllers/api');

// DB connector
// const dbConnector = require('./services/dbconnection');
const database = require('./services/database');

const app = express();

// create webserver and db connection
async function start() {
    
    try {
        app.set('port', process.env.PORT || 8080);
        
        // routes
        app.get('/test', apiController.test);
        app.get('/getAllProducts', apiController.getAllProducts);
        
        // start server
        app.listen(app.get('port'), () => {
            console.log('express is listening on port: ' + app.get('port'));
        });
        
        // establish DB connection pool
        await database.createPool();
        
    } catch(e) {
        console.log(e);
        process.exit(1);
    }
}

// clear db connection
async function shutdown() {
    
    console.log('shutdown');
    
    
    try {
        await database.closePool();
    } catch (e) {

        console.log(e);
    }
    
    process.exit(0);

}

// clear db connection on program exit
process.on('SIGTERM', () => {
    console.log('Received SIGTERM');
    
    shutdown();
});

process.on('SIGINT', () => {
    console.log('Received SIGINT');
    
    shutdown();
});

process.on('uncaughtException', err => {
    console.log('Uncaught exception');
    console.error(err);
    
    shutdown(err);
});

start();

module.exports = app;
