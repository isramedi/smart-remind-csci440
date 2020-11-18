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
router.get('/dashboard/reminds', isLoggedIn, user.show_reminds);



module.exports = router;
