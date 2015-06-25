//node libraries, should also be contained in the /package.json file
var koa = require('koa');
var koa_router = require('koa-router');
var request = require('koa-request');//move this to the index.js file
var session = require('koa-generic-session');
var mount = require('koa-mount');
var logger = require('koa-logger');
var limit = require('koa-better-ratelimit');


var passport = require('koa-passport');
var local = require('passport-local').Strategy;

//local libraries
var nodes = require('./lib/lib.js');
var neo4j = require('./lib/neo4j.js')(request);
var auth = require('./lib/auth')(passport,local);//authenticator
var api = require('./lib/api/api.js')(neo4j);//main api, requires an authenticated session
var public_api = require('./lib/api/public_api.js')(auth);//api that can accessed without an active session.

//initializers
var app = koa();
var router = new koa_router(); //this is for the authenticated api
var public_router = new koa_router();//for the non-authenicated api.


//The component order is important.
//__________________________________________________________________ 

//Unkown Error handler:500
nodes.error(app);

//logger
nodes.logger(app,logger,true);

//limiter
nodes.limiter(app,limit);

//session handeler
nodes.session(app,session,auth);

//route accessible without a session. This includes login and log out.
nodes.public_routes(app,public_router,mount,public_api);

//The following routes require a valid session.
nodes.routes(app,router,mount,api);

if (!module.parent) app.listen(1337);//move the port to a config file.
console.log('the Api is running on port 1337');
//__________________________________________________________________


  