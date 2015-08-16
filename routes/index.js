var express = require('express');
var router  = express.Router();
var Users   = require('../models/users');
var session;

/* GET home page. */
router.get('/', function(req, res, next) {
	session = req.session;
	if( session.username ) {
		res.redirect('/items');
		return;
	}
	res.render('index', {
		title   : 'Inventory',
		version : 1.0,
		message : req.flash('info'),
      	user    : session.username

	});
});

router.get('/flash', function(req, res){
	session = req.session;
	req.flash('info', session.username)
	res.redirect('/');
});

router.get('/login', function ( req, res, next ) {
	session = req.session;
	if (session.username) {
		res.redirect('/items')
		return;
	}else {
		res.render('login')
	}
})

router.post('/login', function ( req, res, next ) {
	var username = req.body.username;
	var password = req.body.password;
	session = req.session;
	session.username = username;

	res.redirect('/items')
} )

router.post('/signup', function ( req, res, end ) {
	var user = new Users ( {
		username : req.body.username,
		email    : req.body.email,
		password : req.body.password
	} )

	user.save( function ( err, user ) {
    	if( err ) {
    		return console.error( err )
			res.redirect('/');
			req.flash('info', 'unable to signup');
    	}
		session          = req.session;
		session.username = user.username
 		res.redirect('/items');
	} )


} )

module.exports = router;
