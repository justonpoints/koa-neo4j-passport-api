module.exports = function(passport,local){

//update this to use neo4j, look into using the google and facebook modules.
passport.use(new local(function(username, password, done) { 
  console.log("checking local");
  if (username === 'foo' && password === 'bar')
  {
    done(null, { user: username });
  }
  else
  {
    done(null, false);
  }
}));

passport.serializeUser(function(user, done) { 
  // please read the Passport documentation on how to implement this. We're now
  // just serializing the entire 'user' object. It would be more sane to serialize
  // just the unique user-id, so you can retrieve the user object from the database
  // in .deserializeUser().
  done(null, user);
});

passport.deserializeUser(function(user, done) { 
  // Again, read the documentation.
  done(null, user);
});

return passport;
}