const spawn = require("child_process").spawn;
const schedule = require("node-schedule");

// adding email functionality nodemailer
const nodemailer = require('nodemailer');

//import emial script
const Email = require("../services/email");


schedule.scheduleJob(cron_date, () => {
  console.log("Launching CRON remind\n");
  //spawn("node", ["index.js"]);
  spawn("node", ["services/spawn_child_process_schedule.js"]);
});




/**
 * @class Email
 */
class Schedule {
  /**
   * @method send
   */
  static async reminder(category, title, notes, dateOfRemind, type, urgency, UserId, email, error = false) {
    console.log(`Sending email ${error ? "error alert" : "alert"}...`);


	  console.log("SCHEDULE>REMINDER FUNCTION IS RUNNING");

	  var dateOfReminder = dateOfRemind;
	  console.log("FULL DATE WITHOUT SPLIT" + dateOfReminder);

	  var date_cron = dateOfReminder.split('T').reverse();
	  //console.log("SPLIT" + date_cron);

	  var time = date_cron[0];
	  //console.log("NEW TIME" + time);
	  var date_only = date_cron[1];
	  //console.log("NEW date" + date_only);

	  var time = time.split(':').reverse();
	  var minute = time[0];
	  var hour = time[1];

	  var date_only = date_only.split('-').reverse();
	  var day = date_only[0];
	  var month = date_only[1];
	  var year = date_only[2];


	  console.log("FULL DATE SPLIT:");
	  console.log(minute);
	  console.log(hour);
	  console.log(day);
	  console.log(month);
	  console.log(year);


	  // alternative schedulaing
	  var cron_date = new Date(year,month,day,hour,minute,0);
	  console.log(cron_date);

  	  schedule.scheduleJob(cron_date, () => {
  	    console.log("Launching Remind email.\n");
            //Email.send(email, title, "REMIND: " + title + ", " + category + ", " + notes + ", " + dateOfRemind + ", " + type + ", " + urgency 
	    );
