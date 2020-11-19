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

exports.show_user_reminds = function(req, res, next) {
    return models.Remind.findAll({
    	where: {
            UserId : req.user.id
	}
    }).then(reminds => {
        res.render('remind/user_reminds',{title: 'Express', reminds: reminds });
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
	UserId: req.user.id
	//UserId: req.usueparams.user_id
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


exports.delete_remind = function(req, res, next) {
	return models.Remind.destroy({
		where: {
			id: req.params.remind_id
		}
	}).then(result => {
		res.redirect('/dashboard/reminds');
	})
}

exports.delete_remind_json = function(req, res, next) {
	return models.Remind.destroy({
		where: {
			id: req.params.remind_id
		}
	}).then(result => {
		res.send({ msg: "Success - dynamically deleted remind" });
	})
}






///////////////////
////////// groups
//////////////////


exports.create_group = function(req, res, next) {
    res.render('group/create_group', {title: 'Express' , user: req.user });
	//res.render('dashboard/dashboard', { formData: {}, errors: {} });
}

exports.submit_group = function(req, res, next) {

    return models.Group.create({
        name: req.body.group_name,
	//UserId: req.params.user_id
    }).then(group => {
        res.redirect('/dashboard/groups');
    })
}

exports.show_group = function(req, res, next) {
	return models.Group.findOne({
		where : {
			id : req.params.group_id
		}
	}).then(group => {
		res.render('group/group', { group : group });
	});
}

exports.show_groups = function(req, res, next) {
    return models.Group.findAll().then(groups => {
        res.render('group/groups',{title: 'Express', groups: groups });
    })
    //res.render('remind/reminds', {title: 'Express' , reminds: req.user });
}



//////////////


exports.show_edit_group = function(req, res, next) {
    return models.Group.findOne({
        where : {
            id : req.params.group_id
        }
    }).then(group => {
        res.render('group/edit_group', { group : group });
    });
}

exports.edit_group = function(req, res, next) {

    return models.Group.update({
        name: req.body.group_name,
	//UserId: req.params.user_id
    }, {
        where: {
            id: req.params.group_id
        }
    }).then(result => {
        res.redirect('/dashboard/group/' + req.params.group_id);
    })
}


exports.delete_group = function(req, res, next) {
	return models.Group.destroy({
		where: {
			id: req.params.group_id
		}
	}).then(result => {
		res.redirect('/dashboard/groups');
	})
}

exports.delete_group_json = function(req, res, next) {
	return models.Group.destroy({
		where: {
			id: req.params.group_id
		}
	}).then(result => {
		res.send({ msg: "Success - dynamically deleted Group" });
	})
}






////// calendar view 




exports.get_calendar = function(req, res, next) {
    res.render('remind/calendar', {title: 'Express' , user: req.user });
	//res.render('dashboard/dashboard', { formData: {}, errors: {} });
}
