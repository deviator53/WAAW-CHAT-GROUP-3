const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const verifyEmail = require('../../utils/verifyEmail');
const randomstring = require('randomstring');

const passport = require('passport');
const LocalStraregy = require('passport-local').Strategy;

//local strategy setup
passport.use(new LocalStraregy({
    usernameField: 'username',
    passReqToCallback: true
}, async (req, username, password, done) => {
    await User.findOne({$or: [{username: username}, {email: username}]})
    .then(async (user) => { 
        console.log(">>>>>>::: ", user);
        if (!user) return done(null, false,req.flash('error-message', 'User not found'));

        bcrypt.compare(password, user.password, (err, passwordMatch) => { 
            if (err) {
                return err;
            }
            if (!passwordMatch) return done(null, false, req.flash('error-message', 'Password Incorrect'));

            return done(null, user, req.flash('success-message', 'Login Successful'))

        });


    })

}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
});

module.exports = {
    register: async (req, res) => {
        res.render('auth/register', {pageTitle: 'Register'});
    },

    verify: async (req, res) => {
        res.render('auth/verify-token', {pageTitle: 'Account Verification'});
    },

    login: async (req, res) => {
        res.render('auth/login', {pageTitle: 'Login'});
    },

    logout: (req, res) => {
        req.logOut();
        req.flash('success-message', 'User logged out');
        res.redirect('/');
    },

    forgotPassword: async (req, res) => {
        res.render('auth/forgot-password', {pageTitle: 'Forgot Password'})
    },

    postRegister: async (req, res) => {
        console.log(req.body);
        try {
            let {username, email, password, confirmPassword} = req.body;

        if(password.length < 6) {
            req.flash('error-message', 'Please enter a valid password');
            res.redirect('back');
        }

        if (password != confirmPassword) {
            req.flash('error-message', 'Passwords do not match');
            return res.redirect('back');
        }

        let usernameExists = await User.findOne({ username });
        let emailExists = await User.findOne({ email });

        if (usernameExists) {
            req.flash('error-message', 'Username already exist');
            return res.redirect('back');
        }

        if (emailExists) {
                req.flash('error-message', 'Email already exist');
                return res.redirect('back');
        }

        const salt = await bcrypt.genSalt();
        const hashedpassword = await bcrypt.hash(password, salt);
        const secretToken = randomstring.generate(6);

        let newUser = new User({
            username,
            email,
            secretToken,
            password: hashedpassword
        });

        await verifyEmail(req, username, email, secretToken);

        await newUser.save();
    
        if (!newUser) {
            req.flash('error-messagee', 'Something went wrong, please try again')
            return res.redirect('back');
        }
    
        req.flash('success-message', 'Please check your email to verify your account');
        return res.redirect('/auth/verify-token');
        } catch (err) {
            console.log(err);
        }
    },

    postVerify: async function (req, res) {
        let {token} = req.body;
        console.log(req.body);
        if (!token) {
            req.flash ('error-message', 'Please enter correct token');
            return res.redirect('back')
        }
        let user = await User.findOne({secretToken: token});
        console.log(user);
        if (!user) {
            req.flash('error-message', 'Please enter a valid token');
            return res.redirect('back');
        }

        user.verified = true;
        user.save();
        req.flash('success-message', 'Account Verification successful');
        return res.redirect('/auth/login');
    },

    postLogin: passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true,
        seccessFlash: true,
        session: true,
    }),

    postForgotPassword: async (req, res) => {
        try {
           let {item, password, confirmpassword} = req.body;
           if (password.length < 6) {
               req.flash('error-message', 'Password must be at least 6 characters long');
               return res.redirect('back');
           }
           if (password != confirmpassword) {
               req.flash('error-message', 'Passwords do not match');
               return res.redirect('back')
           }
           let user = await User.findOne({$or: [{username: item}, {email: item}]});
           console.log(user);
           if (!user) {
               req.flash('error-message', 'Please enter a valid email or username');
               return res.redirect('back');
           }
           const salt = await bcrypt.genSalt();
           const hashedpassword = await bcrypt.hash(password, salt);
           user.password = hashedpassword;
           user.save();
           req.flash('success-message', 'Password change successful, you can now login');
           return res.redirect('/auth/login');


        } catch (err) {
            console.log(err);
        }
    },

}