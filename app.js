var http = require('http')
var request = require('request')

var host = process.env.VCAP_APP_HOST || 'localhost'
var port = process.env.VCAP_APP_PORT || 1337

var express = require('express')
var app = express()

app.post('/slack', function(req, res) {
	res.setHeader('Content-Type', 'text/plain')

	request({
		uri: 'http://api.uinames.com',
		json: true
	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			res.end(body.name + " " + body.surname);
		}
	})
});

app.listen(port);
console.log('Server running at http://' + host + ':' + port + '/');