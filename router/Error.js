var errors = {};

class Error{
    constructor(name, msg){
        this.type = 'ERROR',
        this.name = name;
        this.num = Object.keys(errors).length;
        this.msg = `Error [${this.num}]: ${msg}`;
        errors[this.name] = this;
    }
}

new Error('AUTH_LOGIN','Your Email/Password does not match our records');
new Error('DB_CONNECT','We failed to connect to our database. Please try again.');
new Error('DB_RETRIEVE', 'We could not retrieve your data.  Please try again.');
new Error('AUTH_PW_MISMATCH', 'Your passwords did not match.  Try again.');
new Error('AUTH_EMAIL_EXISTS', 'A user with that email address already exists.');
new Error('AUTH_NICKNAME_EXISTS', 'A user with that nickname already exists.');
new Error('AUTH_TEMPUSER_EXISTS', 'We are currently waiting for a response from this email.  Please check your inbox/spam for an email from us');
new Error('AUTH_TEMPUSER_FAIL', 'We failed signing you up.  Sorry about that');
new Error('AUTH_SIGNUPEMAIL', 'We failed to send you an email');

module.exports = errors;