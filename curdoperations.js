const express = require('express');
const app = express();
const bodyParser= require('body-parser');
//const MongoDB = require('MongoDB');
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/books',function(req,res){

	const url = 'mongodb://127.0.0.1:27017/bookstore';

	// use connect method to connect to server

	MongoClient.connect(url,function(err,client){
		// console.log('db',db);
		// console.log('error',err);
		const myAwesomeDB = client.db('bookstore')

	const Collection =myAwesomeDB.collection('math');
	Collection.find({}).toArray(function(err,docs){
	console.log("find the following records");
	console.log(docs);
	client.close()
	res.send(docs);
	});

	});

});


app.get('/books/:id',function(req,res){

	const url = 'mongodb://127.0.0.1:27017/bookstore';

	// use connect method to connect to server

	MongoClient.connect(url,function(err,client){
		// console.log('db',db);
		// console.log('error',err);
	const myAwesomeDB = client.db('bookstore')
	const Collection =myAwesomeDB.collection('math');
	Collection.find({"_id": new ObjectId(req.params.id)}).toArray(function(err,docs){
	console.log("find the following records");
	console.log(docs);
	client.close()
	res.send(docs);
	});

	});

});


//post
app.post('/books', function(req,res){
  const url = 'mongodb://127.0.0.1:27017/bookstore';
  MongoClient.connect(url, { useNewUrlParser: true },function(err,client){

       if(err){
         console.log(err);
       }
   const db = client.db('bookstore');
   const mathCollection = db.collection('math');
   mathCollection.insert(req.body,function(err,result){
   console.log(err);
   console.log(result);
   })
     res.send("inserting data");

});
});

app.put('/books/:id',function(req,res){
  const url = 'mongodb://127.0.0.1:27017/bookstore';
  MongoClient.connect(url, { useNewUrlParser: true },function(err,client){

       if(err){
               console.log(err);
       }
       const db = client.db('bookstore');
       const mathCollection = db.collection('math');
       const newValue = {$set: {chapter1: "functions", address: "zebra 123" }};
       mathCollection.update({"_id": ObjectId(req.params.id)},newValue,function(err,result){
         if(err) throw err;
         console.log('one document updated');

       });
       res.send('updated data');
});
});
// delete
app.delete('/book/:id',function(req,res) {

 MongoClient.connect(url,function(err,client){

      if(err){
        console.log(err);
      }
  const db = client.db('bookstore');

  const collection = db.collection('math');
  collection.remove({"_id": new ObjectId(req.params.id)});
   })
})


port = process.env.Port || 3000;
app.listen(port, () => {
   console.log(`hey server started ${port}`);
})