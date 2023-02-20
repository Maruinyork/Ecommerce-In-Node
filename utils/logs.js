const log4js = require(`log4js`);

log4js.configure({
    appenders: {
        loggConsole: { type: `console` },
        loggFileWarn: { type: `file`, filename: `./log/warn.log` },
        loggFileError: { type: `file`, filename: `./log/error.log` },

    },
    categories: {
        default: { appenders: [`loggConsole`], level: `Debug` },
        warnArchive: { appenders: [`loggFileWarn`], level: `warn` },
        errorArchive: { appenders: [`loggFileError`], level: `error` }
    }
});

module.exports = log4js;
