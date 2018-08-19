require("dotenv").config();

// import my files here
var keys = require('./keys.js');
var spotify = keys.spotify; // I keep getting errors when i do new Spotify(keys.spotify........)

var request = require('request')
var moment = require('moment')

// take in user inputs
var command = process.argv[2]
var input = ''
for (i = 3; i < process.argv.length; i++){
    input += process.argv[i];
}

function concert(input){
    //redefine input as artist
    var artist = input;

    //link to api
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    console.log(queryURL)

}

function spotify(){}

function movie(){}

function doWhatItSays(){}



switch(command){
    case 'concert-this':
        concert(input)
        break;
    case 'spotify-this-song':
        spotify(input)
        break;
    case 'movie-this':
        movie(input)
        break;
    case 'do-what-it-says':
        doWhatItSays(input)
        break;

    default:
        console.log("I could not recognize that command, please state....")
}
