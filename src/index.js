var Alexa = require('alexa-sdk')

exports.handler = function (event, context, callback) {
  var alexa = Alexa.handler(event, context)
  alexa.registerHandlers(handlers)
  alexa.execute()
}

var handlers = {
  'LaunchRequest': function () {
    this.emit('RequestMelee')
  },

  'AnyRequest': function () {
    getHero(0, (name) => {
      this.emit(':ask', name)
    })
  },

  'RequestMelee': function () {
    getHero(1, (name) => {
      this.emit(':ask', name)
    })
  },

  'RequestRanged': function () {
    getHero(2, (name) => {
      this.emit(':ask', name)
    })
  },

  'Stop': function () {
    this.emit(':tell', 'Enjoy the game!')
  }
}

var https = require('https')

function getHero (type, callback) {
  httpsGet((heroes) => {
    var position = -1
    var toCompare = ''

    if (type === 1) {
      toCompare = 'Melee'
    } else if (type === 2) {
      toCompare = 'Ranged'
    } else {
      callback(heroes[random(heroes.length)].localized_name)
      return
    }

    do {
      position = random(heroes.length)
    } while (heroes[position].attack_type.localeCompare(toCompare) !== 0)

    callback(heroes[position].localized_name)
  }
  )
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
