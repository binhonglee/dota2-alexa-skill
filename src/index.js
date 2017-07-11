'use strict'

const Alexa = require('alexa-sdk')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
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
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://api.opendota.com/api/heroes', true)
    xhr.onreadystatechange = function () {
      if (this.readyState === 4) {
        response = JSON.parse(xhr.responseText)
      }
    }
    xhr.send()

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
