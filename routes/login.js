var express = require('express');
var router = express.Router();
var passport = require('passport');
const jwt = require('jsonwebtoken');


/* GET login. */
//Authenticate via Facebook
router.get('/oauth2/facebook', (req, res, next) => {

    //save original url to session
    req.session.redirectTo = req.get("referer");

  next();
}, passport.authenticate('facebook', { session: false }));


//Login user and create JWT

    //send status code 400 if login failed
    //otherwise login the user,
    //and create JWT to pass on logged in user as a token
router.get('/oauth2/facebook/redirect', passport.authenticate('facebook', { session: false }), (req, res) => {
   //passport.authenticate() middleware invokes req.login() automatically.
   //When the login operation completes, user will be assigned to req.user.

 
    console.log(req.user);
    
    // generate a signed json web token with the contents of user object and return it in the response
    const token = jwt.sign(req.user.toJSON(), process.env.JWT_SECRET);
    
    //send JWT over via cookie(only sessions are server-side)
    res.cookie('jwt', token);
    res.redirect(req.session.redirectTo);
    //res.redirect('/');
     
});
  

module.exports = router;
