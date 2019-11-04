const fse = require('fs-extra')
const xml2js = require('xml2js')
/**
 * @description Recieves paths to files
 * @param {string} pathjson
 * @param {string} pathxml
 */
async function init (pathjson, pathxml) {
  this.jsonMoviesPath = pathjson
  this.xmlMoviesPath = pathxml
  const resultXML = await doAvg(this.xmlMoviesPath)
  const resultJson = await doAvg(this.jsonMoviesPath)
  report(resultJson, resultXML)
}
/**
 * Takes the path to the file, reads it and checks
 * if it is xml or json to do the average.
 * @param {string} file
 * @returns Promise<number>
 */
async function doAvg (file) {
  const text = await fse.readFile(file, 'utf8')
  const data = text.startsWith('<?xml')
    ? (await parseXml(text)).movies.movie : JSON.parse(text)
  return average(data)
}
/**
 * XML Parser to Json
 * @param {Promise<string>} text
 */
function parseXml (text) {
  const options = { explicitArray: false }
  return new Promise((resolve, reject) => {
    xml2js.parseString(text, options, (err, data) => {
      err ? reject(err) : resolve(data)
    })
  })
}
/**
 * Takes the Json Objects and
 * does simple average calculation
 * @param {Object} data
 */
function average (data) {
  let avg = 0

  data.map(m => {
    avg += Number(m.rating)
  })

  avg /= data.length
  return avg
}
/**
 * Simple console log print result
 * @param {number} JsonAvg
 * @param {number} XMLAvg
 */
function report (JsonAvg, XMLAvg) {
  console.log('=======================\n')
  console.log('Average in IMDB %d \nAverage in Rotten %d\n', JsonAvg, XMLAvg)
  console.log('=======================')
}

module.exports.init = init
