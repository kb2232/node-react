var passport = require('passport');

//we need to export each routes

module.exports = app => {
	/*get users /auth/google
      Since we are using express to handle the information, we need to tell it to use our google strategy for this kind of request.
      Identifier 'google' is known by passport.
      We want google to give us the user's 1. profile information and 2. email
      */
	app.get
	(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile', 'email'],
		})
	);

	/*
      we need to handle the callback url google directs the user back to. 
      we also need to get the code from the url.
      we simply ask passport to take the url and send it back to identifier 'google', which can see the code and then give us the access to the profile and email scopes.
      */
	app.get('/auth/google/callback', passport.authenticate('google'));

	/*
	whenever an authenticated user is logged in, they can logout out
	with below
	*/
	app.get('/api/logout',(req,res)=>
	{
		req.logout();
		//show that you are no longer signed in
		res.send(req.user);
	});
	
	//to confirm the current user
	app.get('/api/current_user',function(req,res){
		res.send(req.session);
	})
};
