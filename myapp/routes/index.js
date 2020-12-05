var express = require('express');
var router = express.Router();

let landing = require('../controllers/landing');
let user = require('../controllers/user');

/* User accounts routes */

// auth import method
let { isLoggedIn, hasAuth} = require('../middleware/hasAuth.js');


router.get('/login', user.show_login);
router.get('/signup', user.show_signup);
router.post('/login', user.login);
router.post('/signup', user.signup);
router.post('/logout', user.logout);
router.get('/logout', user.logout);

/* GET home page. */

// defining noop - as demostration
//
// const noop = function(req, res, next) {
//     next();
// }

router.get('/', landing.get_landing);
router.post('/', landing.submit_lead);
router.get('/leads', hasAuth, landing.show_leads);
router.get('/lead/:lead_id', landing.show_lead);
router.get('/lead/:lead_id/edit', landing.show_edit_lead);
router.post('/lead/:lead_id/edit', landing.edit_lead);
router.post('/lead/:lead_id/delete', landing.delete_lead);
router.post('/lead/:lead_id/delete-json', landing.delete_lead_json);


// user log in only pages
router.get('/dashboard', isLoggedIn, user.get_dashboard);
router.get('/dashboard/create_remind', isLoggedIn, user.create_remind);
router.post('/dashboard/create_remind', isLoggedIn, user.submit_remind);
router.get('/dashboard/remind/:remind_id', isLoggedIn, user.show_remind);
router.get('/dashboard/remind/:remind_id/edit', isLoggedIn, user.show_edit_remind);
router.post('/dashboard/remind/:remind_id/edit', isLoggedIn, user.edit_remind);
router.post('/dashboard/remind/:remind_id/delete', isLoggedIn, user.delete_remind);
router.post('/dashboard/remind/:remind_id/delete-json', isLoggedIn, user.delete_remind_json);


router.get('/dashboard/admin_reminds', isLoggedIn, user.admin_show_reminds);
router.get('/dashboard/reminds', isLoggedIn, user.show_reminds);


// GROUP log in only pages
router.get('/dashboard/create_group', isLoggedIn, user.create_group);
router.post('/dashboard/create_group', isLoggedIn, user.submit_group);
router.get('/dashboard/group/:group_id', isLoggedIn, user.show_group);
router.get('/dashboard/group/:group_id/edit', isLoggedIn, user.show_edit_group);
router.post('/dashboard/group/:group_id/edit', isLoggedIn, user.edit_group);
router.post('/dashboard/group/:group_id/delete', isLoggedIn, user.delete_group);
router.post('/dashboard/group/:group_id/delete-json', isLoggedIn, user.delete_group_json);


router.get('/dashboard/admin_groups', isLoggedIn, user.admin_show_groups);
router.get('/dashboard/groups', isLoggedIn, user.show_groups);


// users
router.get('/dashboard/user/:user_id', isLoggedIn, user.show_user);
router.get('/dashboard/user/:user_id/edit', isLoggedIn, user.show_edit_user);
router.post('/dashboard/user/:user_id/edit', isLoggedIn, user.edit_user);
router.post('/dashboard/user/:user_id/delete', isLoggedIn, user.delete_user);
router.post('/dashboard/user/:user_id/delete-json', isLoggedIn, user.delete_user_json);



//userGroupRelations
router.get('/dashboard/admin_userGroupRelations', isLoggedIn, user.admin_show_userGroupRelations);
router.post('/dashboard/admin_userGroupRelation/:userGroupRelations_id/delete-json', isLoggedIn, user.delete_userGroupRelation_json);

//calendar
router.get('/dashboard/calendar', isLoggedIn, user.get_calendar);




// admin controlls
router.get('/dashboard/admin', isLoggedIn, user.get_admin);
router.get('/dashboard/admin_users', isLoggedIn, user.admin_show_users);






module.exports = router;
