'use strict'

const Alexa = require('alexa-sdk')

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
    var speechOutput = random(0)

    // Emit the message
    this.emit(':ask', speechOutput)
  },

  'RequestSpecificIntent': function () {
    var attackType = this.event.request.intent.slots.AttackType
    let speechOutput = ''

    if (attackType.value === 'melee') {
      speechOutput = random(1)
    } else if (attackType.value === 'ranged') {
      speechOutput = random(2)
    } else {
      speechOutput = random(0)
    }

    this.emit(':ask', speechOutput)
  },

  // StopIntent handler
  'StopIntent': function () {
    // Tell user "Goodbye"
    this.emit(':tell', 'Enjoy the game!')
  }
}

function random (num) {
  if (num === 1) {
    return melee[Math.floor(Math.random() * melee.length)]
  } else if (num === 2) {
    return ranged[Math.floor(Math.random() * ranged.length)]
  } else {
    var result = Math.floor(Math.random() * (melee.length + ranged.length))

    if (result < melee.length) {
      return melee[result]
    } else {
      return ranged[result - melee.length]
    }
  }
}

var melee = [
  'Anti-Mage',
  'Axe',
  'Bloodseeker',
  'Earthshaker',
  'Juggernaut',
  'Phantom Lancer',
  'Pudge',
  'Sand King',
  'Sven',
  'Tiny',
  'Kunkka',
  'Slardar',
  'Tidehunter',
  'Riki',
  'Beastmaster',
  'Faceless Void',
  'Wraith King',
  'Phantom Assassin',
  'Dragon Knight',
  'Clockwerk',
  'Lifestealer',
  'Dark Seer',
  'Omniknight',
  'Night Stalker',
  'Broodmother',
  'Bounty Hunter',
  'Spectre',
  'Doom',
  'Ursa',
  'Spirit Breaker',
  'Alchemist',
  'Lycan',
  'Brewmaster',
  'Chaos Knight',
  'Meepo',
  'Treant Protector',
  'Ogre Magi',
  'Undying',
  'Nyx Assassin',
  'Naga Siren',
  'Slark',
  'Centaur Warrunner',
  'Magnus',
  'Timbersaw',
  'Bristleback',
  'Tusk',
  'Abaddon',
  'Elder Titan',
  'Legion Commander',
  'Ember Spirit',
  'Earth Spirit',
  'Underlord',
  'Terrorblade',
  'Monkey King'
]

var ranged = [
  'Bane',
  'Crystal Maiden',
  'Drow Ranger',
  'Mirana',
  'Morphling',
  'Shadow Fiend',
  'Puck',
  'Razor',
  'Storm Spirit',
  'Vengeful Spirit',
  'Windranger',
  'Zeus',
  'Lina',
  'Lion',
  'Shadow Shaman',
  'Witch Doctor',
  'Lich',
  'Enigma',
  'Tinker',
  'Sniper',
  'Necrophos',
  'Warlock',
  'Queen of Pain',
  'Venomancer',
  'Death Prophet',
  'Pugna',
  'Templar Assassin',
  'Viper',
  'Luna',
  'Dazzle',
  'Leshrac',
  'Nature\'s Prophet',
  'Clinkz',
  'Enchantress',
  'Huskar',
  'Weaver',
  'Jakiro',
  'Batrider',
  'Chen',
  'Ancient Apparition',
  'Gyrocopter',
  'Invoker',
  'Silencer',
  'Outworld Devourer',
  'Shadow Demon',
  'Lone Druid',
  'Rubick',
  'Disruptor',
  'Keeper of the Light',
  'Io',
  'Visage',
  'Medusa',
  'Troll Warlord',
  'Skywrath Mage',
  'Techies',
  'Phoenix',
  'Oracle',
  'Winter Wyvern',
  'Arc Warden'
]
