var express = require('express');
var router = express.Router();
var database =require('./database');
var mongoose = require('mongoose');


module.exports = function(passport) {

	// =====================================
	// HOME PAGE (with login links) ========
	// =====================================
	//"/" is changed to '/home'

	// =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
	router.get('/login', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('login', { message: req.flash('loginMessage'),
                             "in_ca":true});
	});

	// process the login form
	console.log("entering into a");
	router.post('/login', passport.authenticate('local-login', {
		successRedirect : '/a', // redirect to the secure profile section
		failureRedirect : '/login', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	router.get('/signup', function(req, res) {

		// render the page and pass in any flash data if it exists
		res.render('signup', { message: req.flash('signupMessage') });
	});

	// process the signup form
	router.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));

	// =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	
	router.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile', {
			user: req.user, // get the user out of session and pass to template
			"in_ca":true
		});
	});
	
	
	
	
	
	
	// =====================================
	// LOGOUT ==============================
	// =====================================
	router.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
	return router;
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
		return next();

	// if they aren't redirect them to the home page
	res.redirect('/');
}

