var data = [
  { "name" : "Tim", "status": "active", "level": 12, "score":202},
  {  "name" : "Justin", "status": "inactive", "level": 2, "score":9},
  {  "name" : "Beth", "status": "active", "level": 7, "score":87},
  {  "name" : "Jesse", "status": "active", "level": 3, "score":27}
  ];
var clusterendpoint = process.env.MONGODB_SERVER || "localhost";
var port = process.env.MONGODB_PORT || 27017;
var username = process.env.MONGODB_USERNAME || "docadmin";
var password = process.env.MONGODB_PASSWORD || "password";

  //var clusterendpoint = process.env.clusterendpoint;
  //var username = process.env.username;
  //var password = process.env.password;
  
  console.log(`Connecting to server...${clusterendpoint}`);
  const MongoClient = require('mongodb').MongoClient,
    f = require('util').format,
    fs = require('fs');
    
  const assert = require('assert');
  
  // Connection URL
  //const connstring = `mongodb://${username}:${password}@${clusterendpoint}/sample-database?tls=false&directConnection=true&replicaSet=rs0&readPreference=primary&retryWrites=false`;
  const connstring = `mongodb://${username}:${password}@${clusterendpoint}/sample-database?tls=true&retryWrites=false&ssl_ca_certs=rds-combined-ca-bundle.pem`;
  
  // Database Name
  const dbName = 'myproject';
  const client = new MongoClient(connstring, {tlsCAFile: `./rds-combined-ca-bundle.pem`, useNewUrlParser: true, useUnifiedTopology: true});
  
  // Use connect method to connect to the server
  client.connect(function(err) {
    assert.equal(null, err);
    console.log("Connected successfully to server");
  
    const db = client.db(dbName);
  
    insertDocuments(db, function() {
      client.close();
    });
  });
  
  const insertDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('documents');
    // Insert some documents
    collection.insertMany(data, function(err, result) {
      assert.equal(err, null);
      assert.equal(4, result.result.n);
      assert.equal(4, result.ops.length);
      console.log("Inserted 3 documents into the collection");
      callback(result);
    });
  }

