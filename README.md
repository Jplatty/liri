# LiriBot
A language Interpretation and Recognition Interface that uses command line in node to give you back data
* LIRI will search Spotify for songs, Bands in Town for concerts and OMDB for movies


## Before running LIRI

* Clone down the repository
* please use your own api keys and create your own .env file following the format in the env.example file
    * API Keys Required:
        * OMDB apikey
        * Spotify id and secret

## Installation
* Run your terminal/bash and go to the root of the liri folder
```
npm install
```

## How to use LIRI
* LIRI is able to take in 4 commands utilizing node.js
    * concert-this
    * spotify-this-song
    * movie-this
    * do-what-it-says

## What each command does
<img src='./examples/concert-this.gif'><br>
```
example: node liri.js concert-this <band or artist name>
```
1. 'node liri.js concert-this \<band or artist name\>'
    * Displays a list of results of where the band or artist is performing  

<img src='./examples/spotify-this-song.gif'><br>
```
example: node liri.js spotify-this-song Mr Brightside
```

2. 'node liri.js spotify-this-song \<song name\>'
    * Displays the top 3 results of the song name

<img src='./examples/movie-this.gif'><br>
```
example: node liri.js movie-this The Avengers
```

3. 'node liri.js movie-this \<movie title\>'
    * Displays the following information
        * Title of the movie
        * Year of the movie
        * IMDB Rating of the movie if available
        * Rotten Tomatoes Rating of the movie if available
        * Where was the movie produced
        * Language of the movie
        * Plot of the movie
        * Actors in the movie
    * If there is no movie title inserted, the search will default to Mr. Nobody

    * something special happens if you come across a movie that was produced in a certain country....

<img src='./examples/do-what-it-says.gif'><br>
```
example: node liri.js do-what-it-says
```

4. 'node liri.js do-what-it-says'
    * Takes the text from random.txt and runs the song through the spotify-this-song command


* In addition to logging out your results to the terminal, it will log out your inputs and results in a log.txt file!


## Built With
* [Node.js](https://nodejs.org/en/)
* [Spotify NPM Package](https://www.npmjs.com/package/node-spotify-api)
* [colors NPM Package](https://www.npmjs.com/package/colors)
* [request NPM Package](https://www.npmjs.com/package/request)
* [moment NPM Package](https://www.npmjs.com/package/moment)

## Author

* **Tin Dang**  - [tintdang](https://github.com/tintdang)

## Acknowledgements

* The Coding Boot Camp at UT Austin for giving me the challenge of making this app