import * as fs from "fs"
import * as clc from "cli-color"
import * as moment from "moment"

enum LogLevel {
    Everything = -1,
    Debug = 1,
    Info,
    Notice,
    Warning,
    Error,
    Critical,
    Alert,
    Emergency
}

namespace LogLevel {
    export function serialize(id: LogLevel): string {
        switch (id) {
            case LogLevel.Debug:      return 'DEBUG'
            case LogLevel.Info:       return 'INFO'
            case LogLevel.Notice:     return 'NOTICE'
            case LogLevel.Warning:    return 'WARNING'
            case LogLevel.Error:      return 'ERROR'
            case LogLevel.Critical:   return 'CRITICAL'
            case LogLevel.Alert:      return 'ALERT'
            case LogLevel.Emergency:  return 'EMERGENCY'
            default:                  return `${id}`
          }
    }

    export function serializeColor(id: LogLevel): string {
        let fn = null
        switch (id) {
          case LogLevel.Debug:     fn = clc.cyanBright; break
          case LogLevel.Info:      fn = clc.greenBright; break
          case LogLevel.Notice:    fn = clc.green; break
          case LogLevel.Warning:   fn = clc.yellow; break
          case LogLevel.Error:     fn = clc.red; break
          case LogLevel.Critical:  fn = clc.redBright; break
          case LogLevel.Alert:     fn = clc.yellowBright; break
          case LogLevel.Emergency: fn = clc.cyanBright; break
          default:                 fn = clc.white; break
        }
        return fn(serialize(id))
    }
}

interface PSR3LoggingInterface {
    debug(msg: string, args?: any, channel?: string): void
    info(msg: string, args?: any, channel?: string): void
    notice(msg: string, args?: any, channel?: string): void
    warning(msg: string, args?: any, channel?: string): void
    error(msg: string, args?: any, channel?: string): void
    critical(msg: string, args?: any, channel?: string): void
    alert(msg: string, args?: any, channel?: string): void
    emergency(msg: string, args?: any, channel?: string): void
}

class Log implements PSR3LoggingInterface{
    private _level:      LogLevel
    private _channel:    string | null
    private _dateFormat: string
    private _stdOut:     boolean
    private _path:       string | null

    constructor(level: LogLevel, channel: string | null, path: string | null = null, dateFormat: string = 'DD.MM.YYYY HH:mm:ss')
    {
        this._level      = level
        this._path       = path
        this._dateFormat = dateFormat
        this._channel    = channel
        this._stdOut     = true
    }

    setChannel(name: string): Log {
        this._channel = name
        return this
    }

    setDateFormat(format: string): Log {
        this._dateFormat = format
        return this
    }

    setLevel(level: LogLevel): Log {
        this._level = level
        return this
    }

    setStdOut(active: boolean): Log {
        this._stdOut = active
        return this
    }

    debug(msg: string, args?: any, channel?: string): void {
        this._prepare(LogLevel.Debug, msg, channel, args)
    }

    info(msg: string, args?: any, channel?: string): void {
        this._prepare(LogLevel.Info, msg, channel, args)
    }

    notice(msg: string, args?: any, channel?: string): void {
        this._prepare(LogLevel.Notice, msg, channel, args)
    }

    warning(msg: string, args?: any, channel?: string): void {
        this._prepare(LogLevel.Warning, msg, channel, args)
    }

    error(msg: string, args?: any, channel?: string): void {
        this._prepare(LogLevel.Error, msg, channel, args)
    }

    critical(msg: string, args?: any, channel?: string): void {
        this._prepare(LogLevel.Critical, msg, channel, args)
    }

    alert(msg: string, args?: any, channel?: string): void {
        this._prepare(LogLevel.Alert, msg, channel, args)
    }

    emergency(msg: string, args?: any, channel?: string): void {
        this._prepare(LogLevel.Emergency, msg, channel, args)
    }

    private _prepare(level: LogLevel, msg: string, channel: string | null | undefined, args: any): void {
        if (level >= this._level && msg !== null && msg.length > 0) {
            let stdQuery = `[${LogLevel.serializeColor(level)}]`,
                query    = `[${LogLevel.serialize(level)}]`

            let pad = 0
            switch (level) {
                case LogLevel.Info:
                    pad = 6
                    break
                case LogLevel.Debug:
                case LogLevel.Alert:
                case LogLevel.Error:
                    pad = 5
                    break
                case LogLevel.Notice:
                    pad = 4
                    break
                case LogLevel.Warning:
                    pad = 3
                    break
                case LogLevel.Critical:
                    pad = 2
                    break
                case LogLevel.Emergency:
                    pad = 2
                    break
                default:
                    break
            }

            if (pad > 0) {
                const padStr = ''.padEnd(pad)
                query    += padStr
                stdQuery += padStr
            }

            const useNewChannel: boolean = channel !== null && channel !== undefined && channel.length > 0
            const useOldChannel: boolean = !useNewChannel && this._channel !== null && this._channel.length > 0

            if (useNewChannel === true || useOldChannel === true) {
                stdQuery += `[${clc.magenta(channel !== null && channel !== undefined ? channel : this._channel)}] `
                query    += `[${channel !== null && channel !== undefined? channel : this._channel}] `
            }
            if (this._dateFormat.length > 0) {
                const date: string = moment().format(this._dateFormat)
                stdQuery += `[${clc.cyanBright(date)}]`
                query    += `[${date}]`
            }
            if (args !== undefined && args !== null) {
                if (typeof(args) !== 'string') {
                    args = JSON.stringify(JSON.parse(JSON.stringify(args)), null, 4)
                }
                msg += `\n${args}`
            }
            if (this._stdOut === true) {
                console.log(`${stdQuery} ${msg}`)
            }
            if (this._path !== undefined && this._path !== null && this._path.length > 0) {
                fs.writeFileSync(this._path, `${query} ${msg}\n`, {encoding: 'utf8', flag: 'a'})
            }
        }
    }
}

export = {LogLevel, Log}
