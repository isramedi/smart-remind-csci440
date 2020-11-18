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

exports.show_remind = function(req, res, next) {
	return models.Remind.findOne({
		where : {
			id : req.params.remind_id
		}
	}).then(remind => {
		res.render('remind/remind', { remind : remind });
	});
}

exports.show_reminds = function(req, res, next) {
    return models.Remind.findAll().then(reminds => {
        res.render('remind/reminds',{title: 'Express', reminds: reminds });
    })
    //res.render('remind/reminds', {title: 'Express' , reminds: req.user });
}


exports.submit_remind = function(req, res, next) {

    return models.Remind.create({
        category: req.body.remind_category,
        title: req.body.remind_title,
        dateOfRemind: req.body.remind_dateOfRemind,
        type: req.body.remind_type,
        urgency: req.body.remind_urgency,
	//UserId: req.params.user_id
    }).then(remind => {
        res.redirect('/dashboard/reminds');
    })
}


//////////////


exports.show_edit_remind = function(req, res, next) {
    return models.Remind.findOne({
        where : {
            id : req.params.remind_id
        }
    }).then(remind => {
        res.render('remind/edit_remind', { remind : remind });
    });
}

exports.edit_remind = function(req, res, next) {

    return models.Remind.update({
        category: req.body.remind_category,
        title: req.body.remind_title,
        dateOfRemind: req.body.remind_dateOfRemind,
        type: req.body.remind_type,
        urgency: req.body.remind_urgency,
	//UserId: req.params.user_id
    }, {
        where: {
            id: req.params.remind_id
        }
    }).then(result => {
        res.redirect('/dashboard/remind/' + req.params.remind_id);
    })
}


//exports.delete_lead = function(req, res, next) {
//	return models.Lead.destroy({
//		where: {
//			id: req.params.lead_id
//		}
//	}).then(result => {
//		res.redirect('/leads');
//	})
//}
//
//exports.delete_lead_json = function(req, res, next) {
//	return models.Lead.destroy({
//		where: {
//			id: req.params.lead_id
//		}
//	}).then(result => {
//		res.send({ msg: "Success" });
//	})
//}
