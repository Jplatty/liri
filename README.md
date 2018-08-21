# LiriBot
A language Interpretation and Recognition Interface that uses command line in node to give you back data
* LIRI will search Spotify for songs, Bands in Town for concerts and OMDB for movies

## Technolgies used
* Node.js
* fs
* Spotify NPM Package
* colors NPM Package
* request NPM Package
* moment NPM Package


## Before running LIRI

* Clone down the repository
* In your terminal or Git Bash, go to the root of your LIRI folder and run **npm install**
* please use your own api keys and create your own .env file following the format in the env.example file
    * Keys Required:
        * OMDB apikey
        * Spotify id and secret


## How to use LIRI
* LIRI is able to take in 4 commands utilizing node.js
    * concert-this
    * spotify-this-song
    * movie-this
    * do-what-it-says

## What each command does
1. 'node liri.js concert-this \<band or artist name\>'
    * Displays a list of results of where the band or artist is performing

2. 'node liri.js spotify-this-song \<song name\>'
    * Displays the top 3 results of the song name

3. 'node liri.js movie-this \<movie title\>'
    * Displays the following information
        * Title of the movie
        * Year of the movie
        * IMDB Rating of the movie

4. 'node liri.js do-what-it-says'
    * 


* In addition to logging out your results to the terminal, it will log out your inputs and results in a log.txt file!


