var express = require('express');
var router = express.Router();
var user = require('../controllers/User');
// console.log("came to index router")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/user/create', function(req, res, next) {
  user.create(req, res, next);  
});


module.exports = router;
