var express = require('express');
var router  = express.Router();
var bcrypt  = require('bcrypt');
var Users   = require('../models/users');
var session;

// Salt
var salt = '$2a$10$fdGkCx51MTgjpRno1WLWNO';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* ADD user */
router.post('/', function ( req, res, end ) {
	var user = new Users ( {
		username : req.body.username,
		email    : req.body.email,
		password : bcrypt.hashSync( req.body.password, salt)
	} )

	user.save( function ( err, user ) {
    	if( err.message.indexOf('duplicate key error') > -1 ) {
			req.flash( 'info', 'username or email already exist.' );
			res.redirect('/');
			console.error( err.message )
    	}

    	if ( err.message.indexOf('Users validation failed') > -1 ) {
    		req.flash( 'info', 'Please fill in all fields.' );
			res.redirect('/');
			console.error( err.message )
    	}

    	if ( err ) {
    		req.flash('ooops something went wrong, Please try again.')
    		res.redirect('/');
    		console.error(err);
    	}

		session          = req.session;
		session.username = user.username
 		res.redirect('/items');
	} )
} )

module.exports = router;
