// const oracledb = require('oracledb');
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

exports.getAdItems = async (req, res, next) => {

    var result;
    var adItemId = req.query.ad_item_id;


    var sql = `Select item,original_price,discount_price,item_image,item_label,item_image From v_ad_items`;
    
    
    if (adItemId == null) {
        return res.json({ "error": "invalid parameters" });
    } else {
        sql += " Where ad_item_id=" + adItemId;
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