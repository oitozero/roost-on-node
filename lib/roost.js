var request = require('request');

var makeRequest = function(key, secret, params, callback) {
	var options = {
	    url : 'https://go.goroost.com/api' + params.path,
	    headers : {
	        "Authorization" : "Basic " + new Buffer(key + ":" + secret).toString("base64"),
             "Accept" : "application/json",
             "Content-Type" : "application/json"
	    },
	    method : params.method
    };

	if (typeof params.msg !== 'undefined' && typeof params.url !== 'undefined') {
		options.body = JSON.stringify({alert:params.msg, url: params.url});
	}

	request(options, function (error, data, response) {
		if (error) {
			callback('ERROR' + error);
		} else {
	        callback(response);
	    }
	});
};

var login = function(user, pass, callback) {
    var params = {};
	params.path = '/accounts/details';
	params.method = 'POST';
	makeRequest(user, pass, params, callback);
};

var getNotes = function(key, secret, params, callback) {
	params.path = '/stats/notifications';
	params.method = 'GET';
	makeRequest(key, secret, params, callback);
}

var sendNote = function(key, secret, params, callback) {
	params.path = '/push';
	params.method = 'POST';
	makeRequest(key, secret, params, callback);
}

exports.login = login;
exports.getNotes = getNotes;
exports.sendNote = sendNote;
