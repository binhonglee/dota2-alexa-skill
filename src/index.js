var Alexa = require('alexa-sdk')

exports.handler = function (event, context, callback) {
  var alexa = Alexa.handler(event, context)
  alexa.registerHandlers(handlers)
  alexa.execute()
}

var handlers = {
  'LaunchRequest': function () {
    this.emit(':ask', 'Welcome to Dota 2 Random. Say help for help.')
  },

  'RequestIntent': function () {
    var given = []
    var category = this.event.request.intent.slots.Category
    given.push(category)

    randomHero(given, (name) => {
      this.emit(':tell', name)
    })
  },

  'RequestTwoIntent': function () {
    var given = []
    var category1 = this.event.request.intent.slots.Category1
    var category2 = this.event.request.intent.slots.Category2
    given.push(category1)
    given.push(category2)

    randomHero(given, (name) => {
      this.emit(':tell', name)
    })
  },

  'AnyRequest': function () {
    var given = []
    randomHero(given, (name) => {
      this.emit(':tell', name)
      // this.emit(':ask', 'AnyRequest triggered')
    })
  },

  'AMAZON.HelpIntent': function () {
    this.emit(':ask', 'You can try saying random any hero, random melee carry or random ranged support for more specific randoming.')
  },

  'Stop': function () {
    this.emit(':tell', 'Enjoy the game!')
  }
}

var https = require('https')

function randomHero (categories, callback) {
  var location

  httpsGet((heroes) => {
    do {
      location = random(heroes.length)
    } while (!checkCategory(categories, heroes[location]))

    callback(heroes[location].localized_name)
  })
}

function httpsGet (callback) {
  var options = {
    host: 'api.opendota.com',
    path: '/api/heroes',
    method: 'GET'
  }

  var req = https.request(options, res => {
    res.setEncoding('utf8')
    var returnData = ''

    res.on('data', chunk => {
      returnData = returnData + chunk
    })

    res.on('end', () => {
      var pop = JSON.parse(returnData)
      callback(pop)
    })
  })
  req.end()
}

function random (size) {
  return Math.floor(Math.random() * (size))
}

function checkCategory (categories, hero) {
  var i = 0

  var hits = false

  while (i < categories.length) {
    if (categories[i] === hero.primary_attr || categories[i] === hero.attack_type) {
      hits = true
    } else {
      for (var j = 0; j < hero.roles.length; j++) {
        if (categories[i] === hero.roles[j]) {
          hits = true
          break
        }
      }
    }

    if (hits) {
      i++
      hits = false
    } else {
      return false
    }
  }

  return true
}
