var http = require('http')
var request = require('request')
var bodyParser = require('body-parser')

var host = process.env.VCAP_APP_HOST || 'localhost'
var port = process.env.VCAP_APP_PORT || 1337

var express = require('express')
var app = express()

app.post('/slack', bodyParser.urlencoded({extended: true}), function(req, res) {
	res.setHeader('Content-Type', 'text/plain')
	var text = req.body.text
	var qs = {}
	if (text) {
		var args = text.split(/\s+/)

		if (args.length > 0) {
			if (!isNaN(args[0])) {
				qs.amount = +args.shift()
			}
		}
		
		if (args.length > 0) {
			if (args[0] === "male" || args[0] === "female") {
				qs.gender = args.shift()
				var omitGender = true
			}
		}
		
		if (args.length > 0) {
			qs.country = args.join(" ")
			var omitCountry = true
		}

	}

	console.log("Requesting names from uinames.com. Options: " + JSON.stringify(qs))
	request({
		uri: 'http://api.uinames.com',
		json: true,
		qs: qs
	}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			if (body.error) {
				if (body.error === "No matching pool found") {
					res.send("The country '" + qs.country + "' couldn't be found.")
				} else {
					res.send("There was an error talking to uinames.com (" + body.error + ")")
				}
			} else {
				if (Array.isArray(body)) {
					res.send(body.map(function(person) {
						return formatPerson(person, omitGender, omitCountry)
					}).join("\n"))
				} else {
					res.send(formatPerson(body, omitGender, omitCountry))
				}
			}
		}
	})
})

function formatPerson(person, omitGender, omitCountry) {
	
	var additionalInfo = ""
	if (!omitGender || !omitCountry) {
		additionalInfo += " ("
		if (!omitGender) {
			if (person.gender === "male") {
				var genderSymbol = "\u2642"
			} else {
				var genderSymbol = "\u2640"
			}
			additionalInfo += genderSymbol
		}
		if (!omitGender && !omitCountry) {
			additionalInfo += " "
		}
		if (!omitCountry) {
			var country = person.country.toLowerCase().replace( /\b\w/g, function (m) {
                return m.toUpperCase()
            })
			additionalInfo += country
		}
		additionalInfo += ")"
	}
	return person.name + " *" + person.surname + "*" + additionalInfo
}

app.listen(port)
console.log('Server running at http://' + host + ':' + port + '/')