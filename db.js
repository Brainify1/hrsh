const MongoClient = require("mongodb").MongoClient;
var db;
MongoClient.connect("mongodb://Brainify1:hrsh123@ds163681.mlab.com:63681/hrshdatabase", (err,connection) => {
	if(err){ console.log(err) }
	
	var db = connection;
	
	module.exports = db;
})
	
