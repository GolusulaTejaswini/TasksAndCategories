var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongodb=require('mongodb');
var url = "mongodb://localhost:27017/";
var router = express.Router();

router.get('/', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		// dbo.collection("inventory").find({}, function(err, result) {
		dbo.collection("category").find({}).toArray(function(err, result) {
			if (err) throw err;
			console.log(result.name);
			res.send(result);
		});
	});
});
router.post('/newcategory', function(req, res, next) {
	console.log(req.body);
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var myobj = req;
		console.log("myobj");
		dbo.collection("category").insertOne(req.body, function(err, result) {
			if (err) throw err;
			var response={"response":"added successfully"};
			res.send(response);
		});
	});
});
router.post('/getcurcategory', function(req, res, next) {
	console.log("request",req.body.body.id);
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		dbo.collection("category").find({ _id:new mongodb.ObjectID(req.body.body.id) }).toArray (function(err, result) {
			if (err) throw err;
			console.log(result.name);
			res.send(result);
		});
	});
});



router.delete('/delete', function(req, res, next) {
	console.log("Delete request"+req.body.id);
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var myobj = {_id:new mongodb.ObjectID(req.body.id)};
		console.log("myobj");
		dbo.collection("category").deleteOne(myobj, function(err, result) {
			if (err) throw err;
			var response={"response":"deleted successfully"};
			res.send(response);
		});
	});
});

router.post('/update', function(req, res, next) {
	console.log("Update request",req.body.body);
	request=req.body.body;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var myquery = { _id:new mongodb.ObjectID(request.id)  };
		var newvalues = { $set: request.task };
		dbo.collection("category").updateOne(myquery, newvalues,function(err, result) {
			if (err) throw err;
			var response={"response":"Updated successfully"};
			res.send(response);
		});
	});
});

router.post('/addtocat', function(req, res, next) {
	console.log("Update request",req.body.body.task.taskname);
	request=req.body.body;
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var myquery = { categoryName:request.category  };
		var newvalues = { $push: { tasks: { $each: [ request.task.taskname ] } } };
		dbo.collection("category").updateOne(myquery, newvalues,function(err, result) {
			if (err) throw err;
			else{
				MongoClient.connect(url, function(err, db) {
					if (err) throw err;
					var dbo = db.db("test");
					var myquery = { _id:new mongodb.ObjectID(request.task._id)  };
					var newvalues = { $set: {category: request.category } };
					dbo.collection("task").updateOne(myquery, newvalues,function(err, result) {
						if (err) throw err;
						var response={"response":"Added successfully"};
						res.send(response);
					});
				});
			}
		});
	});

});


module.exports = router;