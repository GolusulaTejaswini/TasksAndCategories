var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongodb=require('mongodb');

var url = "mongodb://localhost:27017/";
var router = express.Router();
router.get('/', function(req, res, next) {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		dbo.collection("task").find({}).toArray(function(err, result) {
			if (err) throw err;
			console.log(result.name);
			res.send(result);
		});
	});
});

router.post('/getcurtask', function(req, res, next) {
	console.log("request",req.body.body.id);
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		dbo.collection("task").find({ _id:new mongodb.ObjectID(req.body.body.id) }).toArray (function(err, result) {
			if (err) throw err;
			console.log(result.name);
			res.send(result);
		});
	});
});

router.post('/newtask', function(req, res, next) {
	console.log(req.body);
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		var dbo = db.db("test");
		var myobj = req.body;
		console.log(myobj);
		var isodate = new Date().toISOString()

		req.body.date=isodate;
		console.log(req.body.date);
		dbo.collection("task").insertOne(req.body, function(err, result) {
			if (err) throw err;
			else{
				var myquery = { categoryName:req.body.category  };
				var newvalues = { $push: { tasks: { $each: [ req.body.taskname ] } } };
				dbo.collection("category").updateOne(myquery, newvalues,function(err, result) {
					if (err) throw err;
					var response={"response":"added successfully"};
					res.send(response);

				});
			}
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

//		console.log(myobj);
		dbo.collection("task").deleteOne(myobj, function(err, result) {
			if (err) throw err;
			else{
				var newvalues={ $pull: { tasks: { $in: [ req.body.task.taskname ] } }};

				dbo.collection("category").update({}, newvalues,{ multi: true },function(err, result) {
					if (err) throw err;
					var response={"response":"deleted successfully"};
					res.send(response);

				});

			}

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
		dbo.collection("task").updateOne(myquery, newvalues,function(err, result) {
			if (err) throw err;
			var response={"response":"Updated successfully"};
			res.send(response);
		});
	});
});

module.exports = router;

