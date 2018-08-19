require("dotenv").config();

// import my files here
var keys = require('./keys.js');
var spotify = keys.spotify; // I keep getting errors when i do new Spotify(keys.spotify........)
var colors = require('colors')
var request = require('request')
var moment = require('moment')

// take in user inputs
var command = process.argv[2]
var input = ''
for (i = 3; i < process.argv.length; i++) {
    input += process.argv[i]; //Think of a way to put these inputs together cleanly for urls....
}

function concert(input) {
    // if input is nothing
    if (input === '') {
        return console.log("Please input a artist name".red)
    }

    //redefine input as artist
    var artist = input;


    //link to api
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    console.log(queryURL)

    request(queryURL, function (error, response, body) {
        if (error) {
            return error
        }
        else if (!error && response.statusCode === 200) {
            //to make it easier to read
            var call = JSON.parse(body)[0]
            
            function printVenue() {
                console.log("=================================================".blue)
                console.log(artist + " is performing at " + call.venue.name)
                console.log("At " + call.venue.city + ", " + location)
                console.log("On " + moment(call.datetime, moment.ISO_8601).format("MM/DD/YYYY"))
                console.log("=================================================".blue)
            }

            // if there is no region
            if (call.venue.region === "") {
                var location = call.venue.country;
                printVenue();
            } else {
                var location = call.venue.region;
                printVenue();
            }
        }
    })


}

function spotify() { }

function movie() { }

function doWhatItSays() { }



switch (command) {
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
