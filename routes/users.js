var express = require('express');
var router = express.Router();
var sqlite = require('sqlite3').verbose();
var file = './data/kang.db';
var db = new sqlite.Database(file);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/login', function(req, res, next) {
  console.log("get session userid =>"+req.session.userid);
  res.render('users/login', { title: 'login', userid:  req.session.userid});
});

router.post('/login', function(req, res, next) {
  
  SELECT_DATA = "Select * from t_user WHERE user_id=$id AND passwd = $passwd";
  db.each(SELECT_DATA, {$id: req.body.userid,$passwd : req.body.passwd},function(err, rows) {
    if (!err) {    
      if(rows==null){
        console.log("Null user");
        res.render('users/login', { title: 'login', userid:''});
        return;
      }else {
        req.session.userid = rows.user_id;
        res.redirect('/main');
      }
    }
  });
});


router.get('/sign', function(req, res, next) {
  res.render('users/sign', { title: 'sign in', userid:  req.session.userid});
});

router.post('/sign', function(req, res, next) {
  var INSERT_DATA = "Insert into t_user(user_id, passwd, user_nm, user_add) values(?,?,?,?)";

  db.run(INSERT_DATA, [req.body.user_id, req.body.passwd, req.body.user_nm, req.body.user_add], function(err) {
      if (err) {
          console.log(err);
          return;
      } else {
          req.session.userid = req.body.user_id;
          res.redirect('/main');
      }
  });

});



router.get('/logout', function(req, res, next) {
  req.session.userid = '';
  res.render('main', { title: 'main',userid:''});
});


module.exports = router;
