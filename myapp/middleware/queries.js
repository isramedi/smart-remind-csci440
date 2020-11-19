let createError = require('http-errors');

exports.isLoggedIn = function(req, res, next) {
    if (req.user)
        next();
    else
        next(createError(404, "Not Found"));
}

exports.hasAuth = function(req, res, next) {
    if (req.user && req.user.is_admin == true)
        next();
    else
        next(createError(404, "Not Found"));
}

exports.remindsFromUser = function(req, res, next) { 
	if(req.remind.UserId == req.user.id) {
	
	
	
	}
}
