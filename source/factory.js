module.exports = ({ spawn, args }, name, configuration = {}) => {
  return options => {
    return spawn(
      name,
      Object.keys(configuration.args)
      .reduce((acc, action) => args[action](configuration.args[action]), args)(options),
      configuration.options
    )
  }
}
