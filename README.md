# node-psr-log

A PSR-3 Logger class, but in node.js

## Installation

- Add `node-psr-log` to your `package.json` using `yarn add node-psr-log` or `npm install node-psr-log`.
- Require the package.
- Initialize the instance.
- Profit.

## Usage

```JS
const {Log, LogType} = require('node-psr-log')

const log = new Log('/my/path/or/null/to/ignore/file/logging', LogType.Notice)
log.setChannel('my-awesome-project')
log.setStdOut(true)

// will be ignored because info < notice
log.info('test message')
// will be displayed in stdout / written to file
log.warning('test message')
```

## new Log(path[, level, dateFormat])

Creates a new log instance

**Syntax**

```JS
// log to stdout only
const log = new Log(null)
// or log to stdout + file
const log = new Log('~/test.log')
// or log to file only
const log = new Log('~/test.log')
log.setStdOut(false)
```

**Parameters**

- `path`
  - Type: `string` or `null`
  - The log output filepath.
- `level`
  - Type: `LogType`
    - Optional, by default the value is set to `LogType.Everything`
  - Determines the minimum level at which the instance will start logging.
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
log.setLevel(LogType.Everything)
```

**Parameters**

- `level`
  - Type: `LogType`
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

## method(msg[, channel = null, args = undefined])

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
log.notice('this is a notice message from another channel', 'git')
// use 'app' as channel name and print some arguments
log.warning('oops, we ran into some problems...', 'app', {code: 2, message: 'not implemented'})
```

**Parameters**

- `msg`
  - Type: `string`
  - The message to log.
- `channel`
  - Type: `string`
    - Optional and by default set to `null`.
  - Use another channel name instead of the default one for this message.
- `args`
  - Type: `any`
    - Optional and by default set to `undefined`.
  - Can be used to display error values or other stuff.
