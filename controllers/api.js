const oracledb = require('oracledb');
const database = require('../services/database');


exports.test = async (req, res, next) => {

    return res.json({
        "test": ['Test', "test"]
    });

}

exports.getAllProducts = async (req, res, next) => {

    var result;

    const sql = `SELECT * FROM PRODUCT_ITEM`;

    try {
        result = await database.query(sql);
        return res.json(result);
    }
    catch(err) {
        console.log(err);
        return res.json({"error":"error"});
    }

}