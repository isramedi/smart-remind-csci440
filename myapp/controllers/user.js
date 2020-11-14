let models = require("../models");
let bcrypt = require("bcrypt");
const passport = require('passport');
const myPassport = require('../passport_setup')(passport);
let flash = require('connect-flash');
// validtor import
const {isEmpty} = require('lodash');
const {validateUser} = require('../validators/signup');
const {validateCreateUserFields} = require('../validators/signup');

// importing validator
//const { validateUser } = require('../validators/signup');


exports.show_login = function(req, res, next) {
	res.render('user/login', { formData: {}, errors: {} });
}

exports.show_signup = function(req, res, next) {
	res.render('user/signup', { formData: {}, errors: {} });
}

// validator
const rerender_signup = function(errors, req, res, next) {
	res.render('user/signup', { formData: req.body, errors: errors });
}

const generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

exports.signup = function(req, res, next) {
	// validtator, goes over errors first
	let errors = {};
	return validateUser(errors, req).then(errors => {
		if(!isEmpty(errors)) {
			rerender_signup(errors, req, res, next);
		} else {
			return models.User.findOne({
				where: {
					is_admin: true
				}
			}).then(user => {
				let newUser;
				if(user != null) {
					// make password
					newUser = models.User.build({
						email: req.body.email,
						password: generateHash(req.body.password)
					});
				} else {
					// make password
					newUser = models.User.build({
						email: req.body.email,
						password: generateHash(req.body.password),
						is_admin: true
					});
				}
				//save password
				return newUser.save().then(result => {
					passport.authenticate('local', {
						successRedirect: "/",
						failureRedirect: "/signup",
						failureFlash: true
					})(req, res, next);
				})
			})
		}
	})
}

exports.login = function(req, res, next) {
		passport.authenticate('local', {
			successRedirect: "/dashboard",
			failureRedirect: "/login",
			failureFlash: true
		})(req, res, next);
}


exports.logout = function(req, res, next) {
	req.logout();
	req.session.destroy();
	res.redirect('/');
}


exports.get_dashboard = function(req, res, next) {
    res.render('dashboard/dashboard', {title: 'Express' , user: req.user });
	//res.render('dashboard/dashboard', { formData: {}, errors: {} });
}
exports.create_remind = function(req, res, next) {
    res.render('remind/create_remind', {title: 'Express' , user: req.user });
	//res.render('dashboard/dashboard', { formData: {}, errors: {} });
}

//exports.show_remind = function(req, res, next) {
//	return models.Lead.findOne({
//		where : {
//			id : req.params.lead_id
//		}
//	}).then(lead => {
//		res.render('remind/remind', { lead : lead });
//	});
//}

exports.show_reminds = function(req, res, next) {
//    return models.Reminder.findAll().then(reminds => {
//        res.render('remind/reminds',{title: 'Express', reminds: reminds });
//    })
    res.render('remind/reminds', {title: 'Express' , reminds: req.user });
}
