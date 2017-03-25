# bound-spawn

Bind `child_process.spawn` to a command and configuration.

## usage

```javascript
const node = require(`bound-spawn`)(
  `node`,
  {
    args: {
      alias: {
        eval: `-e`
      }
    }
  }
)

node({ eval: `console.log('hello')` })
.stdout.on(`data`, data => console.log(data.toString()))
```

## api

### `boundSpawn(command[, configuration])`

- `command` - &lt;string&gt; the command to run
- `configuration` - &lt;Object&gt;
  - `args` - &lt;Object&gt; configure [options-to-args](https://www.npmjs.com/package/options-to-args)
    - `prefix` - &lt;string&gt;
    - `alias` - &lt;Object&gt;
    - `behaviour` - &lt;Object&gt;
  - options - &lt;Object&gt; same as the options object in the documentation for [child_process.spawn](https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options).

Returns a function with the following signature:

`fn([options])`

- `options` - &lt;Object&gt; passed on to [options-to-args](https://www.npmjs.com/package/options-to-args)

Returns &lt;ChildProcess&gt;

### `.args`

The [options-to-args](https://www.npmjs.com/package/options-to-args) module
