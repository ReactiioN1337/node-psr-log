'use strict'

const clc = require('cli-color')

const LogType =
{
  Everything: -1,
  Debug:      1,
  Info:       2,
  Notice:     3,
  Warning:    4,
  Error:      5,
  Critical:   6,
  Alert:      7,
  Emergency:  8
}

LogType.toString = (id) => {
  switch (id) {
    case LogType.Debug:      return 'DEBUG'
    case LogType.Info:       return 'INFO'
    case LogType.Notice:     return 'NOTICE'
    case LogType.Warning:    return 'WARNING'
    case LogType.Error:      return 'ERROR'
    case LogType.Critical:   return 'CRITICAL'
    case LogType.Alert:      return 'ALERT'
    case LogType.Emergency:  return 'EMERGENCY'
    default:                 return null
  }
}

LogType.toColorString = (id) => {
  let fn = null
  switch (id) {
    case LogType.Debug:     fn = clc.cyanBright; break
    case LogType.Info:      fn = clc.greenBright; break
    case LogType.Notice:    fn = clc.green; break
    case LogType.Warning:   fn = clc.yellow; break
    case LogType.Error:     fn = clc.red; break
    case LogType.Critical:  fn = clc.redBright; break
    case LogType.Alert:     fn = clc.yellowBright; break
    case LogType.Emergency: fn = clc.cyanBright; break
    default: break
  }
  return fn === null ? null : fn(LogType.toString(id))
}

module.exports = LogType
