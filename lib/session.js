module.exports = function(app,session,auth){
	app.keys = ['eriugheirughr-eruigjeirughieurghieurhg-0294875gh92340h5g'];
	app.use(session());
	app.use(auth.initialize());
	app.use(auth.session());
}