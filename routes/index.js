var express = require('express');
var router  = express.Router();
var Users   = require('../models/users');
var bcrypt  = require('bcrypt');
var session;

// Salt
var salt = '$2a$10$fdGkCx51MTgjpRno1WLWNO';
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
	req.flash('info', 'session.username')
	res.redirect('/');
});

router.get('/login', function ( req, res, next ) {
	session = req.session;
	if (session.username) {
		res.redirect('/items')
		return;
	} else {
		res.render('login', {
			message : req.flash('info')
		} )
	}
} )

router.post('/login', function ( req, res, next ) {
	var username = req.body.username;
	var password = bcrypt.hashSync( req.body.password, salt );

	if ( !username ) {
		req.flash('info', 'invalid username or password');
		res.redirect('/login');
		return;
	}
	Users.findOne( {'username' : username }, function ( err, result ) {
		if ( !result ) {
			req.flash('info', 'Username doesnt exist');
			res.redirect('/login');
		} else if ( result.username === username && result.password === password) {
			session = req.session;
			session.username = username;
			res.redirect('/items')
		} else {
			req.flash('info', 'invalid username or password');
			res.redirect('/login');
		}
	} )

} )

router.get('/logout', function (req, res, next) {
	req.session.destroy();
	res.redirect('/');
})

module.exports = router;
