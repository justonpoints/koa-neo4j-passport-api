//update this to work like public_api

var request = require('koa-request');//move this to the index.js file
var username = "username";//move this to a config file
var password = "passport";

//Move the Neo4j stuff to its own module. Connect to the database more securely.
var database = "http://"+username+":"+password+"@localhost:7474/db/data/transaction/commit";
var params={limit: 10}

//Basic neo4j query. Add more query types as needed
//this needs to be sanitized
function cypher(query,params) {
  return request.post(
    {
      uri:database,
      json:{
            statements:[{statement:query,parameters:params}]
      }
    });
}

//generic template if api request contains a bad parameter
function bad_parameter(app,message){
    app.type = 'json';
    app.response.status = 400;
    app.body = {"error":"bad parameter","message": message};
}
 
//generic template if an api is missing a paramter
function missing_parameter(app,message){
    app.type = 'json';
    app.response.status = 400;
    app.body = {"error":"missing parameter","message":message};
}
  

//genral neo4j query, makes a call to return actors with the birth date supplied in "data"
//required: date(number)
exports.all = function *() {
    var app = this;
    var date = app.request.query.date;
    if (isNaN(date) !== true){
      var query="MATCH (n {born:"+date+"}) RETURN n";
      var response = yield cypher(query,params); 
      var info = response.body;
      app.type = 'json';
      app.status = 200;
      app.body = JSON.stringify(info.results[0].data);
    }
    else if(date !== undefined && isNaN(date) === true){
      bad_parameter(app,'The parameter [date] must be a number');
    }
    else{
      missing_parameter(app,"The parameter [date] is required");
    }
}

//still working on this example
exports.single = function *() {
  this.body = 'testing';
  console.log("test");
    var query="MATCH (n {born:1982}) RETURN n"
    var response = yield request.post({uri:database,json:{statements:[{statement:query,parameters:params}]}}); 
    var info = response.body;
 
    this.body = JSON.stringify(info.results[0]);
    console.log("test",info);
  }

//call to be used when the api does not exist
exports.dne = function *(){
    this.type = 'json';
    this.response.status = 404;
    this.body = {"error":'The following path is invalid'};
}

//general call to confirm logged in status. Need to add the username to this
exports.loggedin = function *(){
  this.response.status = 200;
  this.body = {"success":"You are logged in"}
}