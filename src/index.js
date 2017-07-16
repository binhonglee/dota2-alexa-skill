var Alexa = require('alexa-sdk')
var askingConditions = [3, 3, false, false, false, false, false, false, false, false, false]

exports.handler = function (event, context, callback) {
  var alexa = Alexa.handler(event, context)
  alexa.registerHandlers(handlers)
  alexa.execute()
}

var handlers = {
  'LaunchRequest': function () {
    this.emit(':ask', 'Welcome to Dota 2 Random.')
  },

  'RequestMeleeCarry': function () {
    reset()
    askingConditions[1] = 0
    askingConditions[2] = true
    getHero(askingConditions, (name) => {
      this.emit(':ask', name)
      // this.emit(':ask', 'RequestMeleeCarry')
    })
  },

  'RequestMeleeSupport': function () {
    reset()
    askingConditions[1] = 0
    askingConditions[3] = true
    getHero(askingConditions, (name) => {
      this.emit(':ask', name)
      // this.emit(':ask', 'RequestMeleeSupport')
    })
  },

  'RequestRangedCarry': function () {
    reset()
    askingConditions[1] = 1
    askingConditions[2] = true
    getHero(askingConditions, (name) => {
      this.emit(':ask', name)
      // this.emit(':ask', 'RequestRangedCarry')
    })
  },

  'RequestRangedSupport': function () {
    reset()
    askingConditions[1] = 1
    askingConditions[3] = true
    getHero(askingConditions, (name) => {
      this.emit(':ask', name)
      // this.emit(':ask', 'RequestRangedSupport')
    })
  },

  'RequestCarry': function () {
    reset()
    askingConditions[2] = true
    getHero(askingConditions, (name) => {
      this.emit(':ask', name)
      // this.emit(':ask', 'RequestCarry')
    })
  },

  'RequestSupport': function () {
    reset()
    askingConditions[3] = true
    getHero(askingConditions, (name) => {
      this.emit(':ask', name)
      // this.emit(':ask', 'RequestSupport')
    })
  },

  'RequestMelee': function () {
    reset()
    askingConditions[1] = 0
    getHero(askingConditions, (name) => {
      this.emit(':ask', name)
      // this.emit(':ask', 'RequestMelee')
    })
  },

  'RequestRanged': function () {
    reset()
    askingConditions[1] = 1
    getHero(askingConditions, (name) => {
      this.emit(':ask', name)
      // this.emit(':ask', 'RequestRanged')
    })
  },

  'AnyRequest': function () {
    reset()
    getHero(askingConditions, (name) => {
      this.emit(':ask', name)
      // this.emit(':ask', 'AnyRequest triggered')
    })
  },

  'Stop': function () {
    this.emit(':tell', 'Enjoy the game!')
  }
}

var https = require('https')

function getHero (conditions, callback) {
  var location

  httpsGet((heroes) => {
    do {
      location = random(heroes.length)
    } while (!checkConditions(conditions, heroes[location]))

    callback(heroes[location].localized_name)
    // callback(heroes[location].attack_type + ': ' + heroes[location].localized_name)
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

function checkConditions (conditions, hero) {
  if (!checkType(conditions[0], hero.primary_attr)) {
    return false
  }

  if (!checkAttackType(conditions[1], hero.attack_type)) {
    return false
  }

  var allConditions = []

  // carry
  if (conditions[2]) {
    allConditions.push('Carry')
  }
  // support
  if (conditions[3]) {
    allConditions.push('Support')
  }
  // jungler
  if (conditions[4]) {
    allConditions.push('Jungler')
  }
  // escape
  if (conditions[5]) {
    allConditions.push('Escape')
  }
  // nuker
  if (conditions[6]) {
    allConditions.push('Nuker')
  }
  // durable
  if (conditions[7]) {
    allConditions.push('Durable')
  }
  // disabler
  if (conditions[8]) {
    allConditions.push('Disabler')
  }
  // initiator
  if (conditions[9]) {
    allConditions.push('Initiator')
  }
  // pusher
  if (conditions[10]) {
    allConditions.push('Pusher')
  }

  if (allConditions.length > 0 && !checkRoles(allConditions, hero.roles)) {
    return false
  }

  return true
}

function checkType (type, toCheck) {
  switch (type) {
    case 0:
      return (toCheck === 'str')
    case 1:
      return (toCheck === 'agi')
    case 2:
      return (toCheck === 'int')
    default:
      return true
  }
}

function checkAttackType (atype, toCheck) {
  switch (atype) {
    case 0:
      return (toCheck.localeCompare('Melee') === 0)
    case 1:
      return (toCheck.localeCompare('Ranged') === 0)
    default:
      return true
  }
}

function checkRoles (roles, toCheck) {
  var match = true

  for (var i = 0; i < roles.length; i++) {
    var thisCondition = false

    for (var j = 0; j < toCheck.length; j++) {
      if (roles[i].localeCompare(toCheck[j]) === 0) {
        thisCondition = true
      }
    }

    if (!thisCondition) {
      match = false
    }
  }

  return match
}

function reset () {
  askingConditions = [3, 3, false, false, false, false, false, false, false, false, false]
}
