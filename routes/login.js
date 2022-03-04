var express = require('express');
var router = express.Router();
var passport = require('passport');
const jwt = require('jsonwebtoken');

/* GET login. */
//Authenticate via Facebook
router.get('/oauth2/facebook', passport.authenticate('facebook', {session: false}));


//Login user and create JWT

    //send status code 400 if login failed
    //otherwise login the user,
    //and create JWT to pass on logged in user as a token
router.get('/oauth2/facebook/redirect', passport.authenticate('facebook', { session: false }, (err, user, info) => {
    if (err || !user) {
        return res.status(400).json({
            message: 'Something is not right',
            user: user
        });
    }
    
    

    req.login(user, { session: false }, (err) => {
        if (err) {
            res.send(err);
        }

        // generate a signed json web token with the contents of user object and return it in the response

        const token = jwt.sign(user, process.env.JWT_SECRET);
        return res.json({ user, token });
    });
    
}));
  

module.exports = router;
