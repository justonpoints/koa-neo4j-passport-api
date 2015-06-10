module.exports = function(auth){
   var api = {}
   var auth = auth;
  
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

  api.logout = function *() {
    var app = this;
    app.logout();
    app.body = {success: "Logged Out"};
  }

  return api;
}
  