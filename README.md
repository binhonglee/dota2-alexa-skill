# Dota 2 Random - Alexa Skill

[![Build Status](https://travis-ci.org/binhonglee/dota2-random.svg?branch=master)](https://travis-ci.org/binhonglee/dota2-random) [![Test Coverage](https://codeclimate.com/github/binhonglee/dota2-random/badges/coverage.svg)](https://codeclimate.com/github/binhonglee/dota2-random/coverage) [![Dependency Status](https://gemnasium.com/badges/github.com/binhonglee/dota2-random.svg)](https://gemnasium.com/github.com/binhonglee/dota2-random)

## Skill is now available from the [Alexa Skill Store](https://www.amazon.com/binhonglee-Dota2-Random/dp/B073W4GDLS)!

### Dependency
- node.js
- alexa-sdk

### Documentations

#### Intents

| Intents | Description |
|:---------|:------------|
| `LaunchRequest` | Introduction to the skill. |
| `AnyRequest` | Random any hero |
| `RequestIntent` | Takes in 1 ROLE_TYPES as limitation for random |
| `RequestTwoIntent` | Takes in 2 ROLE_TYPES as limitation for random |
| `RequestThreeIntent` | Takes in 3 ROLE_TYPES as limitation for random |
| `AMAZON.HelpIntent` | Provide examples on how to use the skill |
| `Stop` | Stop the skill |

#### ROLE_TYPES (Custom slot)
- melee
- ranged
- carry
- support
- strength
- intelligence
- agility
- nuker
- initiator
- escape
