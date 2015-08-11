/*eslint-env node */
/*eslint quotes: [2, "single"], curly: 2*/

'use strict';

var instapush = require('instapush');

function throwError(msg) {
    console.log('Error', msg);
    throw new Error(msg);
}

//instapush
// need to add all the keys before sendNotificaton

var InstaPush = function () {
    this.ssl = true;
    this.token = null;
    this.id = null;
    this.event = null;
    this.tracker = null;
    this.secret = null;
};

InstaPush.prototype.addKey = function (key, value) {
    this[key] = value;
};

InstaPush.prototype.sendNotification = function () {
    this.addSettings();
    instapush.notify({ event: this.event, trackers: this.tracker}, function (err, response) {
        if (err) {
            console.log(err);
        }
        console.log(response);
    });
};

InstaPush.prototype.addSettings = function () {
    if (this.token === null || this.id === null || this.id === null || this.secret === null || this.event === null || this.tracker === null) {
        throwError('token, id ,secret, event or tracker not set');
    }
    instapush.settings({ssl: this.ssl, token: this.token, id: this.id, secret: this.secret} );
};


exports.InstaPush = InstaPush;
