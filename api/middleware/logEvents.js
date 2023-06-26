const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const logEvents = async (message, logFile) => {
    const dateTime = `${format(new Date(), 'yyyy-MM-dd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
            await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
        }

        await fsPromises.appendFile(path.join(__dirname, "..", "logs", logFile), logItem);
    } catch (err) {
        console.log(err);
    }
}


const reqLogger = async (req, res, next) => {
    const message = `${req.method}\t${req.headers.origin}\t${req.url}`;
    logEvents(message, 'reqLog.txt');
    console.log(message);
    next();
}

module.exports = { logEvents, reqLogger };