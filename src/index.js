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
    var category = this.event.request.intent.slots.Role.value.toString()
    given.push(category)

    randomHero(given, (name) => {
      this.emit(':tell', name)
    })
  },

  'RequestTwoIntent': function () {
    var given = []
    var category1 = this.event.request.intent.slots.RoleOne.value.toString()
    var category2 = this.event.request.intent.slots.RoleTwo.value.toString()
    given.push(category1)
    given.push(category2)

    randomHero(given, (name) => {
      this.emit(':tell', name)
    })
  },

  'RequestThreeIntent': function () {
    var given = []
    var category1 = this.event.request.intent.slots.RoleOne.value.toString()
    var category2 = this.event.request.intent.slots.RoleTwo.value.toString()
    var category3 = this.event.request.intent.slots.RoleThree.value.toString()
    given.push(category1)
    given.push(category2)
    given.push(category3)

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
    this.emit(':ask', 'You can try saying random any hero, random melee carry or random ranged support.')
  },

  'Stop': function () {
    this.emit(':tell', 'Enjoy the game!')
  }
}

var https = require('https')

function randomHero (categories, callback) {
  var location

  httpsGet((heroes) => {
    var possible = false
    var i = 0

    while (possible === false && i < heroes.length) {
      if (checkCategory(categories, heroes[i])) {
        possible = true
      }
      i++
    }

    if (!possible) {
      var errorMessage = 'Random failed'
      callback(errorMessage)
      return
    }

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
  var hits = false

  for (var i = 0; i < categories.length; i++) {
    if (categories[i].toLowerCase().localeCompare(hero.attack_type.toLowerCase()) === 0 || categories[i].toLowerCase().substring(0, 3).localeCompare(hero.primary_attr) === 0) {
      hits = true
    } else {
      for (var j = 0; j < hero.roles.length; j++) {
        if (categories[i].toLowerCase().localeCompare(hero.roles[j].toLowerCase()) === 0) {
          hits = true
          break
        }
      }
    }

    if (hits) {
      hits = false
    } else {
      return false
    }
  }

  return true
}
