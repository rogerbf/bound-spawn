const boundSpawn = require(`./bound-spawn`)
const args = require(`options-to-args`)

it(`calls spawn with a command, args array and spawn options`, () => {
  const spawn = jest.fn()

  boundSpawn(
    { spawn, args },
    `somebin`,
    {
      args: { prefix: `-`, alias: { rotate: `r` } },
      options: { an: `option` }
    }
  )({ rotate: true })

  expect(spawn).toHaveBeenCalledWith(
    `somebin`,
    [ `-r` ],
    { an: `option` }
  )
})

it(`calls spawn with default arguments`, () => {
  const spawn = jest.fn()

  boundSpawn({ spawn, args }, `somebin`)()

  expect(spawn).toHaveBeenCalledWith(
    `somebin`,
    [],
    {}
  )
})

it(`throws when called without a command`, () => {
  const spawn = jest.fn()

  expect(() => boundSpawn({ spawn, args }))
  .toThrowError(`missing argument: command`)
})
