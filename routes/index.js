var express = require('express');
var router = express.Router();
var sqlite = require('sqlite3').verbose();
var file = './data/kang.db';
var db = new sqlite.Database(file);

/* GET users listing. */
router.get('/main', function(req, res, next) {
  var user = req.session.userid;
  if(user==null)
    user ="";
  var currlang=req.cookies.MyHouselang;
  console.log(currlang);
  console.log("get session userid =>"+user);
  
  SELECT_DATA = "select week, group_concat(work_time,',') work_time from t_Calendar group by week";
  db.all(SELECT_DATA, function(err, rows) {
    console.log(JSON.stringify(rows));
    res.render('main', { title: 'KangHouse',lang:currlang,userid:req.session.userid,rows:rows});
  });

  
});

router.get('/', function(req, res, next) {
  console.log("get session userid =>"+req.session.userid);
  res.redirect('/main');
});


router.get('/en',function(req,res){
  res.cookie('MyHouselang','en');
  res.redirect('back');
});
 

router.get('/ko',function(req,res){
  res.cookie('MyHouselang','ko');
  res.redirect('back');
});

module.exports = router;
