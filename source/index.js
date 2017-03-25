const { spawn } = require(`child_process`)
const args = require(`options-to-args`)

module.exports = Object.assign(
  require(`./bound-spawn`).bind(null, { spawn, args }),
  args
)
