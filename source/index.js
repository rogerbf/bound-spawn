import { spawn } from 'child_process'

const errorHandler = (err, reject) => {
  reject(err)
}

export default (...args) => {
  const command = args.filter(arg => typeof (arg) === `string`)[0]
  const options = args.filter(arg => typeof (arg) === `object`)[0]

  if (!command) { throw new Error(`missing argument: command`) }

  return (...args) => {
    const childArguments = args.filter(arg =>
      typeof (arg) === `string` || Array.isArray(arg)
    )[0]

    return new Promise((resolve, reject) => {
      const child = spawn(command, childArguments, options)

      child.once(`error`, err => errorHandler(err, reject))

      process.nextTick(() => {
        child.removeListener(`error`, errorHandler)
        resolve(child)
      })
    })
  }
}
