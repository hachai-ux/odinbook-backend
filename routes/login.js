var express = require('express');
var router = express.Router();
var passport = require('passport');


router.get('/oauth2/facebook', function (req, res, next) {
  
    passport.authenticate('facebook');
    
});

router.get('/oauth2/facebook/redirect', function (req, res, next) {
  
    passport.authenticate('facebook', { failureRedirect: '/login' }, (err, user, info) => {
        res.redirect('/');
    }
    )
});


module.exports = router;
