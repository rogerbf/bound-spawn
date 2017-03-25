const required = () => {
  throw Error(`missing argument: command`)
}

module.exports = ({ spawn, args }, command = required(), configuration = {}) =>
  (options = {}) =>
    spawn(
      command,
      Object.keys(configuration.args || {})
      .reduce(
        (computed, method) => computed[method](configuration.args[method]),
        args
      )(options),
      configuration.options || {}
    )
