require("dotenv").config();

// import my files here
var keys = require('./keys.js');
var spotify = keys.spotify; // I keep getting errors when i do new Spotify(keys.spotify........)

var request = require('request')
var moment = require('moment')

// take in user inputs

var input = ''
for (i = 2; i < process.argv.length; i++){
    input += ' ' + process.argv[i];
}

function concert(){}

function spotify(){}

function movie(){}

function doWhatItSays(){}


