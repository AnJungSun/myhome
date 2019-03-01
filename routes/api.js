var express = require('express');
var router = express.Router();
var sqlite = require('sqlite3').verbose();
var file = './data/kang.db';
var db = new sqlite.Database(file);

router.get('/data', function(req, res, next) {
    //SELECT_DATA = "Select * from t_user WHERE user_id=$id AND passwd = $passwd";
    SELECT_DATA = "select id, title, s_dt as start, e_dt as end from T_Calendar";
    db.all(SELECT_DATA, function(err, rows) {
        console.log(JSON.stringify(rows));
        
        res.json(rows);
    });
});


module.exports = router;
