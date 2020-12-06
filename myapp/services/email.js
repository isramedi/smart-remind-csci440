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

// adding email functionality nodemailer
const nodemailer = require('nodemailer');


/////// send email functionaliites


//emial message options
//


//const mailOptions = {
//	from: 'smart.remind.com@gmail.com',
//	to: 'smart.remind.com@gmail.com',
//	subject: 'email from node_app: test message',
//	text: 'HELLO lads'
//};


//email trnasport config
const user = "smart.remind.com@gmail.com";

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user,
		pass: '21$tcentauryC0m59367'
	}
});


/**
 * @class Email
 */
class Email {
  /**
   * @method send
   */
  static async send(msg, to_email, title, error = false) {
    console.log(`Sending email ${error ? "error alert" : "alert"}...`);

    transporter.sendMail({
      to: to_email,
      from: user,
      subject: error ? "Scraper Error" : title,
      html: msg
    });

    console.log(`Alert sent successfully.`);
  }
}


 Email.send("mesage","smart.remind.com@gmail.com","title");


