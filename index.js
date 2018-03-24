'use strict';

var express = require('express');
var request = require('request');
var hbs = require('express-hbs');
var path = require('path');

var app = express();

app.set('view engine', 'hbs');
app.engine('hbs', hbs.express4({
	defaultLayout: __dirname + '/htdocs/index.hbs',
	partialsDir: __dirname + '/htdocs/views/partials',
	layoutsDir: __dirname + '/htdocs/views/layouts'
}));



hbs.registerHelper('ifCond', function (value1, value2, options) {
	if (value1 === value2) {
		return options.fn(this);
	}
	return options.inverse(this);

});

hbs.registerHelper('slice', function (array, start, end, options) {
	var arraySlice = array.slice(start, end);
	return arraySlice;
});

app.set('views', path.join(__dirname, '/htdocs/views'));
app.use(express.static(path.join(__dirname, '/htdocs')));

app.get('/', function (req, res) {
	request('http://localhost:3000/data.json', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render('home', data);
		}
	});
});

app.listen(3000, function () {
	console.log('listen on http://localhost:3000');
});
