var express = require('express');

//the first application
/*
the app object is used to listen to incoming request via a door (port)
*/
var app = express();

/*
here, i am creating a route to handle a specific request.
the below route-handler says, if the request is to "get" a webpage 'localhost:5000/', then respond back to the requester with a hi message.
*/
app.get('/', (req, res) => {
	res.send({ bye: 'friend' });
});
/*
Express has different types of methods to respond to information:
1. get - get information
2. post - send info
3. put - update ALL properties of something
4. delete - delete something
5. patch - update one or two properties of something
*/


/*
information is coming through door 5000. 
my app is listening to the information.
*/

//create a dynamic port for deployement - check notes
var PORT = process.env.PORT || 5000;
app.listen(PORT);
/*
process.env.PORT is used by heroku or dynamically(@runtime) generate a port number for us OR If no port number is generated, use door 5000.
*/