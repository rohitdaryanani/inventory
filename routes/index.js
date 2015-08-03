var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	title   : 'Inventory',
  	version : 1.0,
  	message: req.flash('info')
  });
});

router.get('/flash', function(req, res){
  req.flash('info', 'Hi there!')
  res.redirect('/');
});

module.exports = router;
