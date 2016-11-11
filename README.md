# bound-spawn

`child_process.spawn` bound to a command with an optional configuration object.

## usage

```javascript
import spawn from 'bound-spawn'

const node = spawn(`node`)

node()
  .then(instance => console.log(instance.pid))
  .catch(console.error)
```

## options

Options can be passed to the underlaying `spawn` call.

```javascript
const node = spawn(`node`, { cwd: `/some/dir` })
```
