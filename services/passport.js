var passport = require('passport'),
	GoogleStrategy = require('passport-google-oauth20').Strategy;
/*
  passport-google-oauth20 imports multiple properties - but we only care about the strategy property
   */
var mongoose = require('mongoose');
/*
  bring in mongoose so we can give access to mongoose model class inside passport
  */

//bring in the google keys
var keys = require('../config/keys');

/*
  we need to create a new instance of a user. this is why
  we want to give access to mongoose model class inside passport
*/
var User = mongoose.model('usersCollection');

passport.serializeUser((newuser,done)=>{
	//newuser is what is returned by the promise below
	//'done' is a callback
	done(null,newuser.id);
	/*newuser.id IS NOT the profile.id from google.
	it is the _id that mongo generates to each collection. We cannot assume that every user has a google id.
	*/
});

passport.deserializeUser((id,done)=>{
	//id = is the same thing as the newuser.id from the serializeUser()
	// we find that user in the database, return it with newuser, then call done()
	User.findById(id)
		.then(newuser => {
			done(null,newuser);
		})
});

/*I want to be able to autheticate users with GoogleStrategy(argument-1, argument-2);
only after we PASS the first argument is done do we handle the second argument
*/
authenX = new GoogleStrategy(
	{
		/*when we request the client's info from google, it needs to know who we are - below are the clientID and password*/
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		/*after the user grant us permission - this is where they will be sent -
    make sure google accepts this callback url
    */
		callbackURL: '/auth/google/callback',
		proxy: true
	},
	(accessToken, refreshToken, profile, done) => {
		/*
    the second argument is called (accessToken,refreshToken, profile, done).
    It only gets implemented after the first argument. These are the information google sent back to us regarding the user. All of this information is given in an array, we need to do something to the user profile.
   */

		/*we need search our database first - this is done by doing a query.
    A query returns what is called a "promise" - .then().
		.then(arg1) - takes argument 1 which we can name anything - in this case - existingUser.
		After the user is created and saved or we found one in database, we need to tell passport that we are DONE done();
		done(arg1,arg2) - arg1 signifies that there is no error; arg1 says that this is the user that we found.
    */
		User.findOne({ googleID: profile.id }).then(existingUser => {
			if (existingUser) {
				//we already have a record with given profile id
				done(null,existingUser);
			} else {
				//this is a model instance
				/*
				the method .save() is an asynchronous operations. We do not want to call "done" until the user has been saved into our database..
				User - is the new user created 
				newuser - is the object we created to be returned by the promise - signifying all is good.
				*/
				new User({ googleID: profile.id }).save().then(newuser=>{
					done(null,newuser);
				}) 
				//the .save() is to save it to the collection
			}
		});
	}
);
//I want passport to use the authentication I defined above
passport.use(authenX);
