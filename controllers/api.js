// const oracledb = require('oracledb');
const database = require('../services/database');

exports.home = async (req, res, next) => {
    
    var homeDescription = "API for Uniqlo app";
    
    
    res.send(homeDescription);
}

exports.resetPool = async (req, res, next) => {
    
    try {
        database.resetPool();
        return res.json({
            "result": "pool reset successfully"
        });
    } catch {
        res.status(400);
        return res.json({
            "error": "error"
        });
        
    }
}

exports.getItems = async (req, res, next) => {
    
    var result;
    var name = "item query";

    // parameters
    // var limit = req.query.limit;
    var itemId = req.query.itemId;
    var adId = req.query.adId;
    
    var sql = `SELECT * FROM ITEM`;
    var sqlName = null;
    
    // param check
    // if(isNotNullAndisNumber(limit)) {
    //     sql += " Where ROWNUM<= " + limit;
    // }
    
    if (isNotNullAndisNumber(itemId)) {
        sql += " Where ITEM_ID= " + itemId;
    }

    // TODO: should be single db query with multiple params
    if (isNotNullAndisNumber(adId)) {
        sql = "SELECT * From v_get_ad_products where ad_item_id=" + adId;
        sqlName = "SELECT Name From ad_item WHERE ad_item_id=" + adId;
    }
    
    console.log(sql);
    console.log(sqlName);

    try {
        result = await database.query(sql);
        if(sqlName != null) {
            var nameJson = await database.query(sqlName);
            name = nameJson.rows[0].NAME;
        }

        result["name"] = name;
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
        console.log(res.json);
        return res.json(result);
        
    }
    catch (err) {
        console.log(err);
        res.status(400);
        return res.json({ "error": "error" });
    }
    
}

// don't need
exports.getAdItems = async (req, res, next) => {
    
    var result;
    var nameJson;

    var adItemId = req.query.id;
    
    var sqlAds = `SELECT * From v_get_ad_products where ad_item_id=`;
    var sqlName = "SELECT Name From ad_item WHERE ad_item_id=";
    
    if (adItemId == null || isNaN(adItemId)) {
        console.log("invalid parameters");
        res.status(400);
        return res.json({ "error": "invalid parameters" });
    } else {
        sqlAds += adItemId;
        sqlName += adItemId;
    }

    try {
        result = await database.query(sqlAds);
        nameJson = await database.query(sqlName);

        result["name"] = nameJson.rows[0].NAME;
        return res.json(result);
    }
    catch (err) {
        console.log(err);
        res.status(400);
        return res.json({ "error": "error" });
    }
}

exports.getPopularItems = async (req, res, next) => {

    var result;
    var limit = req.query.limit;
    var sql = `SELECT * FROM ITEM`;

    if (limit == null || !isNaN(limit)) {
        limit = 10;
    }

    sql += ` sample(${limit})`;

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

function isNotNullAndisNumber(num) {
    return (num != null && !isNaN(num));
}