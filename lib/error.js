module.exports = function(app){
	app.use(function *(next){
	try{
	    yield next; //pass on the execution to downstream middlewares
	} catch (err) { //executed only when an error occurs & no other middleware responds to the request
	    this.type = 'json'; 
	    this.status = err.status || 500;
	    this.body = { 'error' : 'Well .... Ahhhhh ..... check the log i guess'};
	    //delegate the error back to application
	    this.app.emit('error', err, this);
	    }
	});
}