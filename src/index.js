'use strict'

const Alexa = require('alexa-sdk')
var https = require('https')
let response = ''

exports.handler = function (event, context, callback) {
  var alexa = Alexa.handler(event, context)
  alexa.registerHandlers(handlers)
  alexa.execute()
}

// Handler for all input
var handlers = {
  // LaunchRequest handler
  'LaunchRequest': function () {
    // Providing users with example of how this is to be used
    const say = 'Welcome to Dota2 random skill! '
    // Emit the message
    this.emit(':ask', say)
  },

  // RequestIntent handler
  'RequestIntent': function () {
    var info = {
      host: 'api.opendota.com/api/heroes',
      port: 443,
      path: '/api/heroes',
      method: 'GET'
    }

    var req = https.request(info, res => {
      res.setEncoding('utf8')
      var returnData = ''

      res.on('data', chunk => {
        returnData = returnData + chunk
      })

      res.on('end', () => {
        response = JSON.parse(returnData)
      })
    })

    req.end()

    var speechOutput = 'Output is :' + response[getRandomInt() - 1] + '?'

    // Emit the message
    this.emit(':ask', speechOutput)
  },

  // StopIntent handler
  'StopIntent': function () {
    // Tell user "Goodbye"
    this.emit(':tell', 'Enjoy the game!')
  }
}

function getRandomInt () {
  return Math.random() * (response.length)
}
