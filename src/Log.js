'use strict'

const moment  = require('moment'),
      clc     = require('cli-color'),
      LogType = require('./LogType'),
      fs      = require('fs')

class Log
{
  constructor(path, level = LogType.Everything, dateFormat = 'DD.MM.YYYY HH:mm:ss')
  {
    this._level      = level
    this._channel    = ''
    this._dateFormat = ''
    this._stdout     = true
    this._path       = path

    this.setDateFormat(dateFormat)
  }

  setChannel(channel)
  {
    this._channel = typeof(channel) === 'string' ? channel : ''
  }

  setDateFormat(dateFormat)
  {
    this._dateFormat = dateFormat === null || dateFormat === undefined
      ? ''
      : dateFormat
  }

  setLevel(level)
  {
    this._level = level
  }

  setStdOut(active)
  {
    this._stdout = active
  }

  setPath(path)
  {
    this._path = path
  }

  debug(msg, channel = null, args = undefined)
  {
    this._prepare(LogType.Debug, msg, channel, args)
  }

  info(msg, channel = null, args = undefined)
  {
    this._prepare(LogType.Info, msg, channel, args)
  }

  notice(msg, channel = null, args = undefined)
  {
    this._prepare(LogType.Notice, msg, channel, args)
  }

  warning(msg, channel = null, args = undefined)
  {
    this._prepare(LogType.Warning, msg, channel, args)
  }

  error(msg, channel = null, args = undefined)
  {
    this._prepare(LogType.Error, msg, channel, args)
  }

  critical(msg, channel = null, args = undefined)
  {
    this._prepare(LogType.Critical, msg, channel, args)
  }

  alert(msg, channel = null, args = undefined)
  {
    this._prepare(LogType.Alert, msg, channel, args)
  }

  emergency(msg, channel = null, args = undefined)
  {
    this._prepare(LogType.Emergency, msg, channel, args)
  }

  _prepare(level, msg, channel, args = undefined)
  {
    if (level >= this._level && msg !== null && msg.length > 0) {

      let stdQuery = `[${LogType.toColorString(level)}]`
      let query    = `[${LogType.toString(level)}]`
      switch (level) {
        case LogType.Debug:
        case LogType.Error:
        case LogType.Info:
        case LogType.Alert:
          stdQuery += '\t'
          query    += '\t'
          break
        default:
          break
      }
      if (this._channel.length > 0 || channel) {
        stdQuery += `\t[${clc.magenta(channel !== null ? channel : this._channel)}]`
        query    += `\t[${channel !== null ? channel : this._channel}]`
      }
      if (this._dateFormat.length > 0) {
        const date = moment().format(this._dateFormat)
        stdQuery += `\t[${clc.cyanBright(date)}]`
        query    += `\t[${date}]`
      }
      if (args !== undefined && args !== null) {
        msg += `
${JSON.stringify(args)}`
      }

      if (this._stdout) {
        console.log(`${stdQuery} ${msg}`)
      }
      if (this._path !== undefined && this._path !== null && this._path.length > 0) {
        fs.writeFileSync(this._path, `${query} ${msg}\n`, {
          encoding: 'utf8',
          flag: 'a'
        })
      }
    }
  }
}

module.exports = {Log, LogType}
