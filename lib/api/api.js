var request = require('koa-request');
var username = "username";
var password = "passport";
var database = "http://"+username+":"+password+"@localhost:7474/db/data/transaction/commit";
var params={limit: 10}

function cypher(query,params) {
  return request.post(
    {
      uri:database,
      json:{
            statements:[{statement:query,parameters:params}]
      }
    });
}

function bad_parameter(app,message){
    app.type = 'json';
    app.response.status = 400;
    app.body = {"error":"bad parameter","message": message};
}
 
function missing_parameter(app,message){
    app.type = 'json';
    app.response.status = 400;
    app.body = {"error":"missing parameter","message":message};
}
  
/**
* GET all the results.
*/
exports.all = function *() {
    var app = this;
    var date = app.request.query.date;
    if (isNaN(date) !== true){
      //var date = this.request.query.date;
      var query="MATCH (n {born:"+date+"}) RETURN n";
      var response = yield cypher(query,params);//request.post({uri:database,json:{statements:[{statement:query,parameters:params}]}});//cypher(query,params); //Yay, HTTP requests with no callbacks! 
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
/**
* GET a single result.
*/
exports.single = function *() {
  this.body = 'testing';
  console.log("test");
    var query="MATCH (n {born:1982}) RETURN n"
    var response = yield request.post({uri:database,json:{statements:[{statement:query,parameters:params}]}});//cypher(query,params); //Yay, HTTP requests with no callbacks! 
    var info = response.body;
 
    this.body = JSON.stringify(info.results[0]);
    console.log("test",info);
  }

exports.dne = function *(){
    this.type = 'json';
    this.response.status = 404;
    this.body = {"error":'The following path is invalid'};
}

exports.loggedin = function *(){
  this.response.status = 200;
  this.body = {"success":"You are logged in"}
}