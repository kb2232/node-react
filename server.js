/*
ORDER OF reuqire statement can cause errors.
node reads line by line
*/
var express = require('express'),
  mongoose = require('mongoose'),
  cookieSession = require('cookie-session'), //enables cookie
  passport = require('passport'), //tell passport to make use of cookie
  keys = require('./config/keys'),
  //to make sure when our app loads - user model also loads
  userModel = require('./models/User');
  passportConfig = require('./services/passport'),
  authRoutes = require('./routes/authRoutes');
 

//connect to mongoose
mongoose.connect(keys.mongoURI);
var db_obj = mongoose.connection;
db_obj.on('error', console.error.bind(console, 'connection error:'));
db_obj.once('open', function() {
  console.log('MongoDB Connected...');
});

var app = express();

//cookie middleware
app.use(
  cookieSession({
    //maximum time cookie stays in browser in ms - 30 days
    maxAge: 30*24*60*60*1000,
    //keys is used to encrpyt the cookie
    keys:[keys.cookieKey]
  })
);

//tell passport to make use of cookies
app.use(passport.initialize());
app.use(passport.session());

//passing the app object to be used in authRoute file
authRoutes(app);

/*
here, i am creating a route to handle a specific request.
the below route-handler says, if the request is to "get" a webpage 'localhost:5000/', then respond back to the requester with a hi message.
*/
app.get('/', (req, res) => {
	res.send({ hi: 'friend' });
});

//create a dynamic port for deployement - check notes
var PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
  console.log(`Server listen at door:${PORT}`);
});
/*
process.env.PORT is used by heroku or dynamically(@runtime) generate a port number for us OR If no port number is generated, use door 5000.
*/
