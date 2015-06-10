//module for handling the public router. Handels logging in, and possible public facing info. Apis are contained in the /lib/api/public_api.js file
module.exports = function(app,public_router,mount,public_api){
		public_router.get('/login',public_api.login);
		public_router.get('/logout',public_api.logout);
		app.use(mount('/api',public_router.middleware()));
}