# Roost API for node.js (OFFICIAL)

[roost-web-push](https://github.com/danstever/roost-on-node) provides a few functions to integrate Web Push by Roost into any node.js app. Current functions return Roost credentials, send push notifications, and return metrics on previously sent notifications. All you need: _Login, Send, Report_.

## Requirements

You can install roost-web-push and its dependencies with npm: `npm install roost-web-push`.

- [node](http://nodejs.org/)
- [request](hhttps://github.com/request/request)

You will also need a Roost account. (Available for free at [GoRoost.com](https://goroost.com).)

## Getting started

Any call to the Roost API (login is the exception) requires an API Key and Secret. These values can be obtained from the [Roost Dashboard](https://go.goroost.com/auth/dashboard) or by using the `Roost.login()` method and sending your _Roost User Name_ and _Roost Password_.

### Login to Roost

	var roost = require('roost-web-push');

	var user = [YOUR ROOST USER NAME];
	var pass = [YOUR ROOST PASSWORD];

	roost.login(user, pass, function(data) {
		//DO SOMETHING WITH LOGIN DATA
	    console.log(data);
	});

The return will be an array of configurations from Roost containing the configuration name, key, and secret. If failed, an error will be returned.

	{
		"success":true,
		"userID":123456,
		"apps":[
			{
				"name":"My Site",
				"secret":"1234567890abcdefg",
				"key":"1234567890abcdefg"
			}
		]
	}	

### Sending a Notification

Notifications consist of a headline of text, and a URL for a landing page. Message and URL should be passed as an object. (Object.msg and Object.url respectively.)

	var roost = require('roost-web-push');

	var key = [YOUR ROOST KEY];
	var secret = [YOUR ROOST SECRET];
	
	var params = {};
	
	params.msg = "My message to send";
	params.url = "http://[URL to landing page][dot]com

	roost.sendNote(key, secret, params, function(data) {
		//DO SOMETHING... Or not here.
	    console.log(data);
	});

Return will be an array with success / failure and a message, along with `notification_id`. This ID corresponds to metrics returned with `getNotes`, and eventually can be used to query metrics on individual notifications. _(Look for future releases of this package)_.
	
	{
		"success":true,
		"message":"Push queued; will be sent to devices within the next few seconds.",
		"notification_id":1234567
	}

### Get Notification Metrics

No application is complete without knowing how it is performing. Roost tracks metrics for individual notifications. The `roost.getNotes()` method returns information on the 10 most recent notifications. _(Future versions will support querying for individual notes, allowing count of returned notifications, and offset)_.

	var roost = require('roost-web-push');
	
	var key = [YOUR ROOST KEY];
	var secret = [YOUR ROOST SECRET];
	
	var params = {};
	
	roost.getNotes(key, secret, params, function(data) {
		//DO SOMETHING WITH NOTES METRICS
	    console.log(data);
	});

Return will be an object containing a _notifications_ array including `id`, `sent` _(date/time)_, `stats.reads`, `stats.sends`, `alert`, and `url`.

	{
		"notifications":[
			{"
				id":1111111,
				"sent":"2014-10-27T18:11:37Z",
				"stats":
					{
						"reads":15,
						"sends":150
					},
				"alert":"Breaking News: Apple Announces new iPhone",
				"url":"http://mysite[dot]com/apple-news"
			},
			{
				"id":2222222,
				"sent":"2014-10-24T20:55:39Z",
				"stats":
					{
						"reads":23,
						"sends":153
					},
					"alert":"How to tackle the hard problems",
					"url":"http://mysite[dot]com/something-hard"
			},
			...
		]
	}

## Support / Requests / Feedback

For additional information, support, feedback, or for feature requests, email [support@goroost.com](mailto:support@goroost.com). We'd like to hear from you.

## Future Features

- Add query parameters to the `roost.getNotes()` method.
- Add _general_ Roost config stats method.
- Provide easy way to include / inject roost.js script onto site