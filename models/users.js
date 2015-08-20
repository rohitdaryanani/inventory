var mongoose = require('mongoose');

var userSchema = mongoose.Schema( {
	'username' : {
		type     : String,
		required : true,
		unique   : true
	},
	'email'    : {
		type     : String,
		required : true,
		unique   : true
	},
	'password' : {
		type     : String,
		required : true
	}
} );

var Users = mongoose.model( 'Users', userSchema );

module.exports = Users;
