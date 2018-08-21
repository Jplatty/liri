require("dotenv").config();

// import my files here
var fs = require('fs')
var keys = require('./keys.js');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var omdb = keys.omdb;
var colors = require('colors')
var request = require('request')
var moment = require('moment')

// take in user inputs
var command = process.argv[2]
var input = ''
// Breaks the process.argv array and starts it at the 3rd index and creates a string with spaces/" " 
// example = [Red, Velvet] => "Red Velvet"
input = process.argv.slice(3).join(" ")

// Warning! code is repeated twice due to the fact that colors is used.

function concert(input) {
    // if input is nothing
    if (input === '') {
        log("Please input a artist name")
        return console.log("Please input a artist name".red)
    }

    //redefine input as artist with + for query links
    var artist = input.replace(/ /g, "+");


    //link to api
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    request(queryURL, function (error, response, body) {
        if (error) {
            log(error + "\r\n")
            return error.red
        }
        else if (!error && response.statusCode === 200) {
            //if band does not exist or Band does not perform anymore
            if (body.length < 20) {
                log("Sorry! No results found.+\r\n")
                return console.log("Sorry! No results found");
            }
            //to make it easier to read

            
            var call = JSON.parse(body)
            var count = 1

            // Report how many results were found
            log(call.length + " Results were found\r\n\r\n")
            console.log(call.length + " Results were found\n")

            // for how big the body results are
            for (i = 0; i < call.length; i++) {

                var venueLocation = JSON.parse(body)[i]

                if (venueLocation.venue.region === "") {
                    var location =
                     venueLocation.venue.country;
                    log("Result: " + count)
                    console.log("Result: " + count)
                    printVenue();
                } else {
                    var location = venueLocation.venue.region;
                    log("Result: " + count)
                    console.log("Result: " + count)
                    printVenue();
                }

                function printVenue() {
                    // ouput to log.txt
                    log("=================================================")
                    log(input + " is performing at " + venueLocation.venue.name)
                    log("At " + venueLocation.venue.city + ", " + location)
                    log("On " + moment(venueLocation.datetime, moment.ISO_8601).format("MM/DD/YYYY") + "\r\n")

                    // output to terminal/bash
                    console.log("=================================================".blue)
                    console.log(input + " is performing at " + venueLocation.venue.name)
                    console.log("At " + venueLocation.venue.city + ", " + location)
                    console.log("On " + moment(venueLocation.datetime, moment.ISO_8601).format("MM/DD/YYYY") + "\n")

                }
                count++
            }

        }
    })


}

function spotifySong(input) {
    // if they don't put in anything pull up "The Sign" by The Ace of Base
    if (input === '') {
        input = 'The Sign';
        log("No input detected, defaulting search to \"The Sign\"\r\n")
        console.log("No input detected, defaulting search to \"The Sign\"".green)
    }


    spotify.search({
        type: 'track',
        query: input
    }, function (err, data) {
        if (err) {
            log(err + "\r\n");
            return console.log(err.red);

        } else {
            // For easier readability
            var searchResults = data.tracks.items;

            if (searchResults.length < 20) {
                log("There were no results for " + input + "\r\n")
                return console.log("There were no results for ".red + input.yellow)
            }

            // notify user that there are 3 search results
            log('There are 3 results based on your search on \'' + input + "\'\r\n")
            console.log('There are 3 results based on your search on \''.cyan + input.yellow + "\'".cyan)

            for (i = 0; i < 3; i++) {

                // created artist array for the case of multiple artists
                var artist = []


                log("======================================================================\r\n")
                console.log("======================================================================\n".blue)

                //Artists, in the case for 1 artist
                if (searchResults[i].artists.length === 1) {

                    log("Artist: " + searchResults[i].artists[0].name)
                    console.log("Artist: " + searchResults[i].artists[0].name)

                } else { // If there are multiple artists

                    for (j = 0; j < searchResults[i].artists.length; j++) {
                        //push into artist array
                        artist.push(searchResults[i].artists[j].name)
                    }
                    //Then join the outputs in the array as a string with & in between each index
                    log("Artists: " + artist.join(" & "))
                    console.log("Artists: " + artist.join(" & ").yellow)
                }


                //Song Name
                log("\nSong Name: " + searchResults[i].name)
                console.log("\nSong Name: " + searchResults[i].name.yellow)


                // Preview Link
                // if preview_url is === null
                if (searchResults[i].preview_url === null) {
                    log("\nSorry! No preview URL is available")
                    console.log("\nSorry! No preview URL is available".red)
                } else {
                    log("\nPreview URL: " + searchResults[i].preview_url + "\n")
                    console.log("\nPreview URL: " + searchResults[i].preview_url.underline.blue)
                }

                // Album Name
                log("\nAlbum Name: " + searchResults[i].album.name + "\r\n")
                console.log("\nAlbum Name: " + searchResults[i].album.name.yellow.bold + "\n")

            }

            log("======================================================================\r\n")

        }
    });
};

function movie(input) {

    if (input === '') {
        input = 'Mr+Nobody';
        log("No input detected, defaulting search to \"Mr. Nobody\"")
        console.log("No input detected, defaulting search to \"Mr. Nobody\"".green)
    }
    //redefine input as artist. if multiple spaces in between words, add a + for the query title
    var title = input.replace(/ /g, "+");

    //link to api
    var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=" + omdb.api_key //uses omdb api key in .env file
    console.log(queryURL)

    request(queryURL, function (error, response, body) {
        if (error) {
            log(error + "\r\n")
            return error
        }
        else if (!error && response.statusCode === 200) {
            //to make it easier to read
            var call = JSON.parse(body)
            // output to log.txt
            log("=================================================");
            log("\n" + call.Title + "\n");
            log("Year Released: " + call.Year);
            log("IMDB Rating: " + call.imdbRating);
            log("Produced in: " + call.Country);
            log("Available languages: " + call.Language);
            log("\nPlot: " + call.Plot);
            log("Actors: " + call.Actors);
            log("\n=================================================\r\n")


            // output to terminal
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

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        log(data + "\r\n")
        console.log(data.yellow)
        //split the data into an array
        var instruction = data.split(",");
        // [ 'spotify-this-song', '"I Want it That Way"' ]
        // set the data to run the start function again
        command = instruction[0]
        input = instruction[1]
        start()
    });
};


function start() {
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
            doWhatItSays()
            break;

        default:
            log("I could not recognize that command, please state one of these commands: ")
            log("\nconcert-this" + "\nspotify-this-song" + "\nmovie-this" + "\ndo-what-it-says\r\n")
            console.log("I could not recognize that command, please state one of these commands: ".red)
            console.log("\nconcert-this" + "\nspotify-this-song" + "\nmovie-this" + "\ndo-what-it-says")
    }
}
// run the program
start()
logCommand()

//print out a long
function logCommand() {
    fs.appendFile("log.txt", "\r\nCommand: " + process.argv.slice(2).join(" ") + "\r\n\r\n", function (err) {
        if (err) {
            console.log(err.red);
        }
    })
    console.log("")
}

function log(print) {
    // Syncronously append the file into the file
    fs.appendFileSync("log.txt", print + "\r\n", function (err) {
        if (err) {
            console.log(err.red);
        }
    })
}