var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../../model/user');
var session = require('express-session');
var jwt = require('jsonwebtoken');
var superSecret = 'hocCNPMmoi'

module.exports = function (app, passport) {
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }));

    passport.serializeUser(function (user, done) {
        console.log(user.name);
        token = jwt.sign({
            name: user.name,
            email: user.email
        }, superSecret, {
            expiresIn: '180s' // expires in 3 minutes
        });
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(Id, function (err, user) {
            done(err, user);
        });
    });

    //Login with Facebook
    passport.use(new FacebookStrategy({
        clientID: '311211640152362',
        clientSecret: '3b5638a440c65fdfd797ce040341f526',
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({ email: profile._json.email }).select('email password name').exec(
                function (err, user) {
                    if (err) done(err);
                    if (user && user != null) {
                        done(null, user);
                    } else {
                        done(err);
                    }
                });
        }
    ));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect: '/facebookerror'
        }),
        function (req, res) {
            res.redirect('/facebook/' + token);
        });
    app.get('/auth/facebook',
        passport.authenticate('facebook', { scope: 'email' })
    );

    //Login with google
    passport.use(new GoogleStrategy({
        clientID: '450874389893-2cqk1gjpl4i2hrlo9hp0jkql3i2fi1j5.apps.googleusercontent.com',
        clientSecret: 'RvBMI8JLRX88PDLopBNzD97m',
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
        function (token, tokenSecret, profile, done) {
            console.log(profile.emails[0].value)
            User.findOne({ email: profile.emails[0].value }).select('email password name').exec(
                function (err, user) {
                    if (err) done(err);
                    if (user && user != null) {
                        done(null, user);
                    } else {
                        done(err);
                    }
                });
        }
    ));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/googleerror'
        }),
        function (req, res) {
            res.redirect('/google/' + token);
        });
    app.get('/auth/google',
        passport.authenticate('google', { scope: ['https://www.google.com/m8/feeds', 'profile', 'email'] }));
    return passport
}