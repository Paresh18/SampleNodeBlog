var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
/*Getting pages*/
// Mongoose Schema definition


var Schema = mongoose.Schema;
var UserSchema = new Schema({
   username: String,
    password: String,
    email: String,
    gender: String,
    address: String
});



// Mongoose Model definition
var user = mongoose.model('user', UserSchema);
/*
router.get('/abc', function (req, res) {
	arr =["pasres","kdfsalf","dgggg"];
	 var result =" "; 
	 var i=0;
	for(i =0; i<arr.length;i++)
	{
		 result =arr[i];
 //   res.send("<a href='/users1'>"+result+"</a>");
	}
	res.send("<a href='/users1'>"+result+"</a>");
});

*/







module.exports = router;
