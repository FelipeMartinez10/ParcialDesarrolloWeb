var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require('path');

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
// Connection URL
var url = 'mongodb://admin:admin@ds123400.mlab.com:23400/parcial1';


function getApiKeys(callback, errorcallback) {
  console.log('entro');
	fs.readFile(path.resolve(__dirname,"./api_key.txt"), "utf-8", (err, api_key) => {
		if (err) {
      console.log(err);
			errorcallback(err);
			return;
		}
		fs.readFile(path.resolve(__dirname,"./api_secret.txt"), "utf-8",(err, api_secret) => {
			if (err) {
        console.log(err);
				errorcallback(err);
				return;
			}
			callback(api_key, api_secret);
		});
	});
}


var insertarMongo = function(valor)
{
  MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        insertDocuments(db,valor, function() {
          db.close();
        });
      });
};
var leerMongo = function()
{
  MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        findDocuments(db, function() {
          db.close();
        });
      });
};

var findDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('buscados');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
};


var insertDocuments = function(db, valor, callback) {
  var collection = db.collection('buscados');
  collection.insert({valor}
, function(err, result) {
    console.log(result);
    callback(result);
  });
};


router.get('/', function(req, res, next) {
  res.send('hola');
});


router.get('/flickr/:query', function (req, res) {
  console.log('Busqueda '+req.params['query']);
	getApiKeys((api_key, api_secret) => {
		const Flickr = require("flickrapi"),
	    flickrOptions = {
	      api_key: api_key.trim(),
	      secret: api_secret.trim()
	    };
	    console.log(api_key);
	    console.log(api_secret);
		Flickr.tokenOnly(flickrOptions, function(error, flickr) {
			console.log("tokenOnly");
			if (error) {
				res.send(error);
				return;
			}
		  // we can now use "flickr" as our API object,
		  // but we can only call public methods and access public data
		  flickr.photos.search({
		  	safe:1,
		  	sort:"relevance",
        per_page: 4,
		  	text:req.params["query"]
		  }, (err, data) => {
		  	if (err) res.send(err);
		  	console.log("Got flickr data sending it");
		  	res.send(data.photos.photo);
		  });
		});

	}, (err) => {
		console.log(err);
		res.send("Error!");
	})
});



router.get('/buscado/:text', function(req, res, next) {
  insertarMongo(req.params.text);
  res.send('hola');
});



var masBuscado = function()
{
  MongoClient.connect(url, function(err, db) {
    var col = db.collection("buscados");
    col.aggregate([{
        "$group": {_id: "$buscado", count: { "$sum": 1}}
    }, {
        "$sort": {count: -1}
    }], function(err, docs) {
        var keys = []
        docs.forEach(function(doc) {
            console.log(JSON.stringify(doc)); // do what you want here.
        });
    });
  });
};

module.exports = router;
