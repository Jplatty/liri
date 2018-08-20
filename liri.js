require("dotenv").config();

// import my files here
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify); // I keep getting errors when i do new Spotify(keys.spotify........)
var omdb = keys.omdb;
var colors = require('colors')
var request = require('request')
var moment = require('moment')

// take in user inputs
var command = process.argv[2]
var input = ''
input = process.argv.slice(3).join(" ")
//.replace(/ /g, "+") use this.

// for (i = 3; i < process.argv.length; i++) {
//     input += process.argv[i]; //Think of a way to put these inputs together cleanly for urls....
// }
// return console.log(process.argv.slice(2).join(" "))  
// It works native

// ["a", "b", "c", "d"].slice(1,3).join("-") //b-c
//to replace my places with +s for weblinks 
// var movie = $(this).attr("data-name").replace(/ /g, "+"); //add + in the space .replace(" ", "+")


function concert(input) {
    // if input is nothing
    if (input === '') {
        return console.log("Please input a artist name".red)
    }

    //redefine input as artist with + for query links
    var artist = input.replace(/ /g, "+");


    //link to api
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    console.log(queryURL)

    request(queryURL, function (error, response, body) {
        if (error) {
            return error.red
        }
        else if (!error && response.statusCode === 200) {
            //to make it easier to read
            var call = JSON.parse(body)[0]

            function printVenue() {
                console.log("=================================================".blue)
                console.log(input + " is performing at " + call.venue.name)
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

function spotifySong(input) {
    // if they don't put in anything pull up "The Sign" by The Ace of Base
    if (input === '') {
        input = 'The Sign';
        console.log("No input detected, defaulting search to \"The Sign\"".green)
    }
    // var artist = input.replace(/ /g, "+");

    spotify.search({
        type: 'track',
        query: input
    }, function (err, data) {
        if (err) {
            console.log("Error occured: " + err);
        }
        // For easier readability
        var searchResults = data.tracks.items;
        //Take the first 5 results

        // notify user that there are 5 search results
        console.log('There are 5 results based on your search on \''.cyan + input.yellow + "\'".cyan)

        for (i = 0; i < 5; i++) {

            // created artist array for the case of multiple artists
            var artist = []


            console.log("======================================================================\n".blue)

            //Artists, in the case for 1 artist
            if (searchResults[i].artists.length === 1) {

                console.log("Artist: " + searchResults[i].artists[0].name)

            } else { // If there are multiple artists

                for (j = 0; j < searchResults[i].artists.length; j++) {
                    //push into artist array
                    artist.push(searchResults[i].artists[j].name)
                }
                //Then join the outputs in the array as a string with & in between each index
                console.log("Artists: " + artist.join(" & ").yellow)
            }


            //Song Name
            console.log("\nSong Name: " + searchResults[i].name.yellow)


            // Preview Link
            // if preview_url is === null
            if (searchResults[i].preview_url === null) {
                console.log("\nSorry! No preview URL is available".red)
            } else {
                console.log("\nPreview URL: " + searchResults[i].preview_url.underline.blue)
            }

            // Album Name
            console.log("\nAlbum Name: " + searchResults[i].album.name.yellow.bold + "\n")

        }
    });
};

function movie(input) {

    if (input === '') {
        input = 'Mr+Nobody';
        console.log("No input detected, defaulting search to \"Mr. Nobody\"".green)
    }
    //redefine input as artist. if multiple spaces in between words, add a + for the query title
    var title = input.replace(/ /g, "+");


    // use request

    //link to api
    var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=" + omdb.api_key //uses omdb api key in .env file
    console.log(queryURL)

    request(queryURL, function (error, response, body) {
        if (error) {
            return error
        }
        else if (!error && response.statusCode === 200) {
            //to make it easier to read
            var call = JSON.parse(body)
            console.log("=================================================".blue);
            console.log("\n" + call.Title + "\n");
            console.log("Year Released: " + call.Year);
            console.log("IMDB Rating: " + call.imdbRating);
            console.log("Produced in: " + call.Country);
            console.log("Available languages: " + call.Language);
            console.log("\nPlot: " + call.Plot);
            console.log("Actors: " + call.Actors);
            console.log("\n=================================================".blue)

            //consider doing colors based on rating using a function
            // ie instead of console.log make ratingColor(call.imdbRating) and inside that function console.log it based on the rating with if else functions up to 3

        }
    })
}

function doWhatItSays(input) {
    // import random.txt
}



switch (command) {
    case 'concert-this':
        concert(input)
        break;
    case 'spotify-this-song':
        spotifySong(input)
        break;
    case 'movie-this':
        movie(input)
        break;
    case 'do-what-it-says':
        doWhatItSays(input)
        break;

    default:
        console.log("I could not recognize that command, please state one of these commands: ")
        console.log("\nconcert-this" + "\nspotify-this-song" + "")
}
