var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/main', function(req, res, next) {
  var user = req.session.userid;
  if(user==null)
    user ="";
  console.log("get session userid =>"+user);
  res.render('main', { title: 'main',userid:req.session.userid});
});

router.get('/', function(req, res, next) {
  console.log("get session userid =>"+req.session.userid);
  res.render('main', { title: 'main',userid:req.session.userid});
});
module.exports = router;
