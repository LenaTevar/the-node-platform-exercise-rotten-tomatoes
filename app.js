const { resolve } = require('path')
const imdb = resolve('./lib/movies/movies.json')
const xml = resolve('./lib/movies/movies.xml')
let reviewer = require('./lib/reviewer')

reviewer.init(imdb, xml)


