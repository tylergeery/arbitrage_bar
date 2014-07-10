
/*
 * GET home page.
 */

var fs = require('fs')
  , path = require('path')
  , sanitize = require('validator').sanitize
  , flash = require('connect-flash');

var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'alculator';
var collections = [];
var mongojs = require("mongojs");

var db = mongojs.connect(mongoUri, collections);
var ObjectId = mongojs.ObjectId;

exports.index = function(req, res) {
	res.render('index', { 	title: 'Arbitrage Bar - Adjusting Liquor Market' });
};

exports.data = function(req, res) {
	res.render('data', { 	title: 'Arbitrage Bar - Data' });
};

exports.setup = function(req, res) {
	res.render('setup', { 	title: 'Arbitrage Bar - Add Information' });
};



