var User = require('../../model/user');
var jwt = require('jsonwebtoken');


var superSecret = 'hocCNPMmoi'

module.exports = function (app, express) {

  var apiRouter = express.Router();

  // route to authenticate a user (POST http://localhost:3000/api/authenticate)
  apiRouter.post('/authenticate', function (req, res) {

    // find the user
    User.findOne({
      email: req.body.email
    }).select('email password name').exec(
      function (err, user) {

        if (err) throw err;

        // no user with that username was found
        if (!user) {
          res.json({
            success: false,
            message: 'Authentication failed. User not found.'
          });
        } else if (user) {

          // check if password matches
          var validPassword = user.comparePassword(req.body.password);
          if (!validPassword) {
            res.json({
              success: false,
              message: 'Authentication failed. Wrong password.'
            });
          } else {

            // if user is found and password is right
            // create a token
            var token = jwt.sign({
              name: user.name,
              email: user.email
            }, superSecret, {
              expiresIn: '180s' // expires in 3 minutes
            });

            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token,
            });
          }

        }

      });
  });

  // route middleware to verify a token
  apiRouter.use(function (req, res, next) {
    // do logging
    console.log('Somebody just came to our app!');

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    // decode token
    if (token) {

      // verifies secret and checks exp
      jwt.verify(token, superSecret, function (err, decoded) {
        if (err)
          return res.json({ success: false, message: 'Failed to authenticate token.', data: null });
        else
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
      });

    } else {


      // if there is no token
      // return an HTTP response of 403 (access forbidden) and an error message
      // refirect to login page
      return res.status(403).send({
        success: false,
        message: 'No token provided.'
      });

    }

    next(); // make sure we go to the next routes and don't stop here
  });
  return apiRouter;
};
