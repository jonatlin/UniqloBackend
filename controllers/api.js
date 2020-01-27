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
    var limit = req.query.limit;
    var id = req.query.id;
    
    var sql = `SELECT * FROM ITEM`;
    
    // param check
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
        console.log(res.json);
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
    var nameJson;

    var adItemId = req.query.id;
    
    var sqlAds = `SELECT * From v_get_ad_products where ad_item_id=`;
    var sqlName = 'SELECT Name From ad_item WHERE ad_item_id=';
    
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