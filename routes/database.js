var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
/*Getting pages*/

// Mongoose Schema definition


var db = mongoose.connect('mongodb://localhost:27017/hngreblog');
console.log("Connected to hngre database");

var Schema = mongoose.Schema;
var blogSchema = new Schema({
   $oid: String,
	body: String,
	permalink:String,
	author:String,
	comments:[
	{
	body:String,
	email:String,
    author:String
	}],
	title:String,
	date: { type: Date },
	tags: { type: [String], index: true }
	
});



// Mongoose Model definition
var blog = mongoose.model('posts', blogSchema);




/*
//making users pages 
router.get('/ab', function (req, res) {
    res.send("<a href='/users1'>Show Users</a>");
});
*/

//The homapage of the blogs
router.get('/', function (req, res) {	
blog.find({},function (err, docs) {
		console.log("rendering the page");
		res.render('blog',{"no_of_blogs":docs
		                  ,"in_ca":true })						  
		console.log("rendered the page");
	}).limit(4);
});



//sorting by date using aggregation but not working
/*
router.get('/index_date', function (req, res) {
	blog.aggregate(
	{
		$projects:
		{
			milliseconds: {$milliseconds:"$date"},
		}
		
	}
	)
blog.find({}).sort({milliseconds:-1}).exec(function (err, docs) {
		console.log("this is index_date");
		res.render('index_date_blog',{"no_of_blogs":docs
		                  ,"in_ca":true })						  
		console.log("sorting by date");
	});   
});


*/


//sorting by date without aggreation but not displaying data something  is wrong with the inde_date_blog page "
//I have kept differnt url for displaying the blog after sorting by date.
 
router.get('/index_date', function (req, res) {
blog.find({},{sort:{date:-1}},function (err, docs) {
	
		console.log("rendering the sorted date page");
		res.render('index_date_blog',{"no_of_blogs":docs
		                  ,"in_ca":true })						  
		console.log("rendered the sorted date page");
	});		
});


	

//sorting by alphbetically	
router.get('/index_alpha', function (req, res) {
   blog.find({},{sort:{body:1}},function (err, docs) {
	   
		res.render('index_alpha',{"no_of_blogs":docs
		                  ,"in_ca":true })						  
		console.log("rendered the page");
	}).limit(4);
      
	});  	
	


//defining the permalinks working
router.get('/posts/:permalink',function(req,res)
{
	
var a =req.params.permalink;
  
 blog.findOne({ 'permalink': a }, function (err, docs) {
  if (err) return handleError(err);
  
  res.render("permalink" ,{"no_of_blogs":docs,
				 "in_ca":true });
  console.log("rendering the permalink page");				 

}); 

});



//definig  the tags  somehow not able to show different tags in different links
//you can access this url by "localhost:3000/tag/bike"  this will give you the right result for particular tag the posts regarding it

router.get("/tag/:tag",function(req,res)
{
	var a =req.params.tag;
     blog.find({ 'tags': a }, function (err, docs) {
      if (err) return handleError(err);
     res.render("tag_query" ,{"no_of_blogs":docs,
				 "in_ca":true });
  console.log("rendering the tag page");				 

}); 	
});	
	

module.exports = router;
