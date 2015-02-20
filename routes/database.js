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
var q= blog.find({}).limit(4);
q.exec(function(err,docs)
{
  	res.render('blog',{"no_of_blogs":docs
		                  ,"in_ca":true })			
});		
});



/*
var q = models.Post.find({published: true}).sort('date', -1).limit(20);
q.execFind(function(err, posts) {
  // `posts` will be of length 20
});
*/


//sorting 

router.get('/adf', function(req, res){
  var a = req.query.sort;
  if(a!='title'&& a!='date')
  {
	 var q= blog.find({}).limit(4);
    q.exec(function(err,docs)
  {
	 res.render('blog_sorted',{
	                      "error":"Sort only by title and date",
		                   })		
   });
  }
  
  else {
console.log(a);  
var q= blog.find({}).sort(a).limit(4);
q.exec(function(err,docs)
{
  	res.render('blog',{"no_of_blogs":docs
		                  ,"in_ca":true })			
});		
}

});


/*
q.exec(function(err,docs)
{
  	res.render('blog',{"no_of_blogs":docs
		                  ,"in_ca":true })			
});		
console.log("this is ending sorting query");
});
*/






//logging into account
router.get('/a', function (req, res) {
var q= blog.find({}).limit(4);
q.exec(function(err,docs)
{
  	res.render('blog_lo',{"no_of_blogs":docs
		                  ,"in_ca":true
						    })			
});		
});

console.log("rendered the blog page");

		

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
