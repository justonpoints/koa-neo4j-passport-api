module.exports = function(request){
  var request = request;

  var username = "neo4j"; 
  var password = "neo4j1";

  //Move the Neo4j stuff to its own module. Connect to the database more securely.
  var database = "http://"+username+":"+password+"@localhost:7474/db/data/transaction/commit";
  var params={limit: 10}

  //Basic neo4j query. Add more query types as needed
  //this needs to be sanitized
  function cypher(query,params) {
    var params = params || {};
    return request.post(
      {
        uri:database,
        json:{
              statements:[{statement:query,parameters:params}]
        }
      });
  }

  return cypher;
}//end exports