/*it is a wise idea to have two sets of keys.
Development key(on your laptop - dont commit it), and Production key(on heroku).
The dev key can be saved in heroku and have its own database different from the prod database
*/

//we want to be able to export it
//figure out what type of credentials to return
if(process.env.NODE_ENV==='production')
{
  //we are in productions
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
//cookieKey can be anything you want - make it up