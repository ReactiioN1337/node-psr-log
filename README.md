# node-psr-log

A PSR-3 Logger class, but in node.js

## Installation

- Add `node-psr-log` to your `package.json` using `yarn add node-psr-log` or `npm install node-psr-log`.
- Require the package.
- Initialize the instance.
- Profit.

## Usage

```JS
const {Log, LogLevel} = require('node-psr-log')

const log = new Log(LogLevel.Notice, 'my-awesome-project', '/my/path/or/null/to/ignore/file/logging')
log.setStdOut(true)

// will be ignored because info < notice
log.info('test message')
// will be displayed in stdout / written to file
log.warning('test message')
// arguments are supported
log.debug('some other test', {data: 'cool'})
// also another channel name for this message
log.debug('some other test', {data: 'nasa'}, 'moon')
```

## new Log(level, [channel, path, dateFormat])

Creates a new log instance

**Syntax**

```JS
// log to stdout only
const log = new Log(LogLevel.Debug)
// or log to stdout + file
const log = new Log(LogLevel.Debug, null, '~/test.log')
// or log to file only
const log = new Log(LogLevel.Debug, null, '~/test.log')
log.setStdOut(false)
```

**Parameters**

- `level`
  - Type: `LogLevel`
    - Optional, by default the value is set to `LogLevel.Everything`
  - Determines the minimum level at which the instance will start logging.
- `channel`
  - Type: `string`, `undefined` or `null`
  - The log channel name
- `path`
  - Type: `string`, `undefined` or `null`
  - The log output filepath.
- `dateFormat`
  - Type: `string`
    - Optional, by default the value is set to `DD.MM.YYYY HH:mm:ss`. See [moment.js](https://momentjs.com/) for more informations about formating.
  - Determines the date-time log format.

## setChannel(channel)

Sets the default channel, by default the channel is set to `""`.

**Syntax**

```JS
log.setChannel('my-awesome-project')
```

**Parameters**

- `channel`
  - Type: `string`
  - The name of the channel

## setDateFormat(dateFormat)

Sets the date-time log format, see [moment.js](https://momentjs.com) for more informations.

**Syntax**

```JS
log.setDateFormat('MM.DD.YYYY HH:mm:ss')
```

**Parameters**

- `dateFormat`
  - Type: `string`
  - The [moment.js](https://momentjs.com) supported formatted date-time string.

## setLevel(level)

Sets the minimum level at which the instance will start logging.

**Syntax**

```JS
log.setLevel(LogLevel.Everything)
```

**Parameters**

- `level`
  - Type: `LogLevel`
  - The minimum level to start logging.

## setStdOut(active)

Enables or disables output to stdout.

**Syntax**

```JS
log.setStdOut(false)
```

**Parameters**

- `active`
  - Type: `bool`
  - `true` to enable it, `false` otherwise.

## setPath(path)

Sets the filepath where the log will be written to.

**Syntax**

```JS
log.setPath('~/test.log')
```

**Parameters**

- `path`
  - Type: `string`
  - The output path where the log can be written to.

## method(msg[, args, channel])

Each of the following log methods uses the parameters given above.

- `debug`
- `info`
- `notice`
- `warning`
- `error`
- `critical`
- `alert`
- `emergency`

**Syntax**

```JS
log.debug('this is a debug message inside the regular channel')
// use "git" as channel name
log.notice('this is a notice message from another channel', null, 'git')
// use 'app' as channel name and print some arguments
log.warning('oops, we ran into some problems...', {code: 2, message: 'not implemented'}, 'app')
```

**Parameters**

- `msg`
  - Type: `string`
  - The message to log.
- `args`
  - Type: `any`
    - Optional and by default set to `undefined`.
  - Can be used to display error values or other stuff.
- `channel`
  - Type: `string`
    - Optional and by default set to `null`.
  - Use another channel name instead of the default one for this message.
