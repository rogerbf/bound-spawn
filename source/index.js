const { spawn } = require(`child_process`)
const args = require(`options-to-args`)

const factory = require(`./factory`).bind(null, { spawn, args })

module.exports = factory
