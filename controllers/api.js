const oracledb = require('oracledb');
const database = require('../services/database');

exports.home = async (req, res, next) => {

    var homeDescription = "API for Uniqlo app";


    res.send(homeDescription);
}

exports.getProducts = async (req, res, next) => {

    var result;
    var limit = req.query.limit;


    var sql = `SELECT * FROM ITEM`;
    if(limit!=null) {
        sql += " Where ROWNUM<= " + limit;
    }

    console.log(sql);
    try {
        result = await database.query(sql);
        return res.json(result);
    }
    catch(err) {
        console.log(err);
        return res.json({"error":"error"});
    }

}

exports.getAds = async (req, res, next) => {

    var result;
    var limit = req.query.limit;


    var sql = `SELECT * FROM AD_ITEM`;
    if (limit != null) {
        sql += " Where ROWNUM<= " + limit;
    }

    console.log(sql);
    try {
        result = await database.query(sql);
        return res.json(result);
    }
    catch (err) {
        console.log(err);
        return res.json({ "error": "error" });
    }

}