// const oracledb = require('oracledb');
const database = require('../services/database');

exports.home = async (req, res, next) => {

    var homeDescription = "API for Uniqlo app";


    res.send(homeDescription);
}

exports.getItems = async (req, res, next) => {

    var result;
    var limit = req.query.limit;
    var id = req.query.id;

    var sql = `SELECT * FROM ITEM`;
    if(limit!=null && !isNaN(limit)) {
        sql += " Where ROWNUM<= " + limit;
    }

    if (id != null && !isNaN(id)) {
        sql += " Where ITEM_ID= " + id;
    }

    console.log(sql);
    try {
        result = await database.query(sql);
        return res.json(result);
    }
    catch(err) {
        console.log(err);
        res.status(400);
        return res.json({"error": "error"});
    }

}

exports.getAds = async (req, res, next) => {

    var result;
    var limit = req.query.limit;


    var sql = `SELECT * FROM AD_ITEM`;
    if (limit != null && !isNaN(limit)) {
        sql += " Where ROWNUM<= " + limit;
    }

    console.log(sql);
    try {
        result = await database.query(sql);
        return res.json(result);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        return res.json({ "error": "error" });
    }

}

exports.getAdItems = async (req, res, next) => {

    var result;
    var adItemId = req.query.id;

    var sql = `SELECT * From v_items where ad_item_id=`;
    
    
    if (adItemId == null || isNaN(adItemId)) {
        res.status(400);
        return res.json({ "error": "invalid parameters" });
    } else {
        sql += adItemId;
    }

    console.log(sql);
    try {
        result = await database.query(sql);
        return res.json(result);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        return res.json({ "error": "error" });
    }
}