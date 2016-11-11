import test from 'tape'
import spawn from '../index'

test(`is a function`, assert => {
  assert.ok(typeof (spawn) === `function`)
  assert.end()
})

test(`returns a function`, assert => {
  const node = spawn(`node`)
  assert.ok(typeof (node) === `function`)
  assert.end()
})

test(`calling bound command returns a promise wrapped ChildProcess`, assert => {
  const node = spawn(`node`)()
  assert.equal(node.constructor.name, `Promise`)
  node.then(instance => {
    assert.ok(instance.constructor.name === `ChildProcess`)
    instance.kill()
    assert.end()
  })
})

test(`reversed options/command order`, assert => {
  const node = spawn({ stdio: `pipe` }, `node`)()
  node.then(instance => {
    assert.ok(instance.constructor.name === `ChildProcess`)
    instance.kill()
    assert.end()
  })
})

test(`spawn without command throws`, assert => {
  assert.throws(spawn)
  assert.end()
})

test(`spawn with empty string throws`, assert => {
  assert.throws(spawn.bind(null, ``))
  assert.end()
})

test(`reject when command not in PATH`, assert => {
  spawn(`notacommandthatisinstalled`)()
    .then(data => assert.notOk(data))
    .catch(e => assert.ok(e))
  assert.end()
})

test(`stdout works as expected`, assert => {
  const node = spawn(`node`)
  node([`-e`, `process.stdout.write("testing")`])
    .then(instance => {
      instance.on(`exit`, assert.end)
      instance.stdout.on(`data`, data => {
        assert.equal(data.toString(), `testing`)
        instance.kill()
      })
    })
})
