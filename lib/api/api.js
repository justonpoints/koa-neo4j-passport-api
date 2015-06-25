//update this to work like public_api
module.exports = function(neo4j){
  var api = {};
  var database = neo4j;

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
  api.all = function *() {
      var app = this;
      var date = app.request.query.date;
      if (isNaN(date) !== true){
        var query="MATCH (n {born:"+date+"}) RETURN n";
        var params={limit: 10};
        var response = yield database(query,params); 
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
  api.single = function *() {
    this.body = 'testing';
    console.log("test");
      var query="MATCH (n {born:1982}) RETURN n"
      var response = yield database.cypher(query);
      var info = response.body;
   
      this.body = JSON.stringify(info.results[0]);
      console.log("test",info);
    }

  //call to be used when the api does not exist
  api.dne = function *(){
      this.type = 'json';
      this.response.status = 404;
      this.body = {"error":'The following path is invalid'};
  }

  //general call to confirm logged in status. Need to add the username to this
  api.loggedin = function *(){
    this.response.status = 200;
    this.body = {"success":"You are logged in"}
  }

  return api;
}//end exports