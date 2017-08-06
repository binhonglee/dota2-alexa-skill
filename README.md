# Dota 2 Random - Alexa Skill

Skill is now available from the [Alexa Skill Store](https://www.amazon.com/binhonglee-Dota2-Random/dp/B073W4GDLS)!

#### Dependency
- alexa-sdk
- node.js

## Documentations

### Intents

| Intents | Description |
|:---------|:------------|
| `LaunchRequest` | Introduction to the skill. |
| `AnyRequest` | Random any hero |
| `RequestIntent` | Takes in 1 ROLE_TYPES as limitation for random |
| `RequestTwoIntent` | Takes in 2 ROLE_TYPES as limitation for random |
| `RequestThreeIntent` | Takes in 3 ROLE_TYPES as limitation for random |
| `AMAZON.HelpIntent` | Provide examples on how to use the skill |
| `Stop` | Stop the skill |

### ROLE_TYPES (Custom slot)
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
