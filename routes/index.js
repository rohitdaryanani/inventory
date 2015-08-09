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

router.get('/login', function ( req, res, next ) {
	res.render('login')
})

router.post('/login', function ( req, res, next ) {
	var username = req.body.username;
	var password = req.body.password;

	console.log(username)
	console.log(password)
} )

module.exports = router;
