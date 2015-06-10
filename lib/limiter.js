module.exports = function(app,limit){
	app.use(
		limit(
			{
				max: 10000, 
				blacklist: []
			}
		)
	);
}