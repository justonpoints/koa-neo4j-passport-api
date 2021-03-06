//this module requires the passport depedency.
// Change auth to passport.

module.exports = function(auth){
   var api = {}//container to store the function's function to be used for export
   var auth = auth;//needs to be explixtly declared to be used generically in the function's functions.
  
  //call to be used to log the user in.
  //required: username(string),password(string)
  api.login = function *() {
    var app = this;
    yield auth.authenticate('local', function*(err, user, info) {
          if (err) throw err
          if (user === false) {
            app.status = 401
            app.body = {success: false}
          } else {
            yield app.login(user)
            app.body = {success: true}
          }
    });
  }

  //call to kill the user's session
  api.logout = function *() {
    var app = this;
    app.logout();
    app.body = {success: "Logged Out"};
  }

  return api;
}
  