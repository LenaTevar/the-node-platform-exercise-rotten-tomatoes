const { resolve } = require('path')
const imdb = resolve('./lib/movies/movies.json')
const xml = resolve('./lib/movies/movies.xml')


console.log('app')
console.log(imdb)
let reviewer = require('./lib/reviewer')
reviewer.init(imdb, xml)


