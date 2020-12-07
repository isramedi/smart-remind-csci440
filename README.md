# smart-remind-csci440
The purpose of this project is to create a program that sets up and manages events and organizes groups. As we can say, remembering events are always important. And our focus is to make a reminder app to make it easier for the user. There are a lot of reminder apps out there, but we are going to add our own twist to ours. This project will be able to send intelligent reminders to users and groups and this will be done by adding dependencies and using a strong database such as MySQL.

# Screenshots
![Login Landing Page](/screenshots/smart-remind_homepage.png?raw=true "Landing Page")
![Login](/screenshots/smart-remind_login.png?raw=true "Login Page")
![Create Remind](/screenshots/smart-remind_createRemind.png?raw=true "Create Remind")
![Remind in Email](/screenshots/smart-remind_notification.png?raw=true "Remind Email Notification")
![Create Group](/screenshots/smart-remind_createGroup.png?raw=true "Create Group")

# Features

## about
This website is used to send reminds using emails and can create groups. A user submits a time, with appropriate data about that remind, and a scheduler will make a schedule, by which it will run at the marked date.

## Website Framework

This website is being hosted in a VPS, a virtual private server, by Vultr. In that server, the domain name smart-remind was bought and connected to that VPS. The VPS is using Debian Linux. 

Certbot was used to allow the website to have HTTPS encrypted connection. In order to manage the web app, nginx was used to make the app more safe by limiting the port being used to 80. Uncomplicated firewall was used on top of this to only allow the nessesary connectins to be made. 

One of these important connections is an SSH connection, which allows us to connect to the VPS from a remote device.

Git was used to upload our work to this repository.

The app itself uses NodeJS, PUG, Bootstrap, MySQL, Javascript, AJAX, and JQuery. 

This website was made with NodeJS, a javascript backend server environment that allows for this app to become realized.
PUG is a HTML engine, or a HTML preprocessor that makes created webpages a lot more coder friendly and productive. It removes HTML tags, and like Python, uses Tabs as organizing the code.
Bootstrap and JQuery served as the CSS framework, which in other words, making front end decorating much easier.
Javascript and AJAX were used for special frontend functionalites. One of this was for dynamiclly deleting reminds without reloading the page.

## Dependencies

All these dependencies were installed with npm, a node package manager program.

```
npm install <packages, seperated with a space> 
```

To install to the specific program, you add the --save modifier at the end.

The following are the dependencies.

* bcrypt    
* connect-flash
* cookie-parser
* debug
* express
* express-session
* http-errors
* lodash
* morgan
* mysql2
* node
* node-schedule
* nodemailer
* passport
* passport-local
* pg
* pug
* sequelizer
* validator
* nodemon

## Reminder Functionality

In order to make reminds work, as of now, may require for configuration in part of your email service. For example, Gmail will require you to go to settings, security, and enable allow unsecure apps. 

Once you signup using your email, and you have done the above, you will be able to make a remind, by which will send a remind to your email address.

When you create a remind, a child process spawns and runs a schedule process, by which will only run once a certain time is reached (aka your remind time). Node-schedule, a npm dependency that is similar to a Cron job, is responsible to running at the desired time. Nodemailer is responsible for actually sending the email to your email.
 

# License

 Apache-2.0 License 
 https://apache.org/licenses/LICENSE-2.0.txt
 
 See LICENSE for more details
