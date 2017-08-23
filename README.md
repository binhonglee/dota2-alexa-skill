# Dota 2 Random

[![Build Status](https://travis-ci.org/binhonglee/dota2-random.svg?branch=master)](https://travis-ci.org/binhonglee/dota2-random) [![codecov](https://codecov.io/gh/binhonglee/dota2-random/branch/master/graph/badge.svg)](https://codecov.io/gh/binhonglee/dota2-random)
 [![Dependency Status](https://gemnasium.com/badges/github.com/binhonglee/dota2-random.svg)](https://gemnasium.com/github.com/binhonglee/dota2-random)

 [<img src="./asset/badge.png" alt="Works with Amazon Alexa" style="width: 200px;"/>](https://www.amazon.com/binhonglee-Dota2-Random/dp/B073W4GDLS)

## Skill is now available at the [Alexa Skill Store](https://www.amazon.com/binhonglee-Dota2-Random/dp/B073W4GDLS)!

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

### Credit
- [test/testflow.js](./test/testflow.js) credit to [alexa/alexa-cookbook](https://github.com/alexa/alexa-cookbook/blob/master/testing/TestFlow/testflow.js)
