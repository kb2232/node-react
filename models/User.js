var mongoose = require('mongoose');
var Schema = mongoose.Schema;
/*
mongoose wants to know all the properties of model instances - this is why we create a schema
*/

var userSchema = new Schema(
  {
    googleID: String
  }
);

//we need to create a model class to create collection
/*
model(arg1,arg2);
arg1: is the name of the collections in the actual mongodb
arg2: userSchema
*/
//if you use one argument, it means you tryna to fetch out of mongoose
mongoose.model('usersCollection',userSchema);