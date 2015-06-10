//node libraries
var koa = require('koa');
var koa_router = require('koa-router');
var session = require('koa-generic-session');
var mount = require('koa-mount');
var logger = require('koa-logger');
var limit = require('koa-better-ratelimit');
var passport = require('koa-passport');
var local = require('passport-local').Strategy;

//local libraries
var components = require('./lib/lib.js');
var auth = require('./lib/auth')(passport,local)//authenticator
var api = require('./lib/api/api.js');//main api, requires an authenticated session
var public_api = require('./lib/api/public_api.js')(auth);//api that can accessed without an active session.

//initializers
var app = koa();
var router = new koa_router(); 
var public_router = new koa_router();


//The component order is important.
//__________________________________________________________________ 

//logger
components.logger(app,logger,true);

//Unkown Error handler 
components.error(app);

//limiter
components.limiter(app,limit);

//session handeler
components.session(app,session,auth);

//route accessible without a session. This includes login and log out.
components.public_routes(app,public_router,mount,public_api);

//The following routes require a valid session.
components.routes(app,router,mount,api);

if (!module.parent) app.listen(1337);
console.log('Dictapi is Running on http://localhost:3000/');
//__________________________________________________________________