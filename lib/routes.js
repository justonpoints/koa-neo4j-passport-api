module.exports = function(app,router,mount,api){
		router.get('/all', validate, api.all);
		router.all('/loggedin', validate, api.loggedin);
		router.get('/single', validate, api.single);
		router.all('/*', validate, api.dne);
		app.use(mount('/api', router.middleware()));
}

//Check if the session is valid
function *validate(next){
  app = this;
  if (app.req.isAuthenticated()){
    yield next;
  } else {
    this.status = 400;
    this.body = {"error":"no active session"}
  }
}