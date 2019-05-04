const winston = require('winston');
const fs = require('fs');
const server = require('config').get('server');

const dir = './logs/';

// Define your custom format with printf.
const time = winston.format.printf(info => {
	return `${info.timestamp} --> ${info.level}: ${info.message}`
  });

// define the custom settings for each transport (file, console)
const options = {
	console: {
		name: 'console',
		handleExceptions: true,
		json: false,
		format: winston.format.combine(
			winston.format.timestamp({
				format: 'YYYY-MM-DD HH:mm:ss'
			}),
			time,
		  )
	},
	file: {
		name: 'file#info',
		level: 'info',
		filename: dir + 'app.log',
		handleExceptions: true,
		json: true,
		maxsize: 5242880, 
		maxFiles: 5,
		colorize: false,
		format: winston.format.combine(
			winston.format.timestamp({
				format: 'YYYY-MM-DD HH:mm:ss'
			}),
			time
		)
	},
	error: {
		name: 'file#error',
		level: 'warn',
		filename: dir + 'app-error.log',
		handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: false,
		format: winston.format.combine(
			winston.format.timestamp({
				format: 'YYYY-MM-DD HH:mm:ss'
			}),
			time
		)
	},
	debug: {
		name: 'file#debug',
		level: 'debug',
		filename: dir + 'app-debug.log',
		handleExceptions: true,
		json: true,
		maxsize: 5242880, // 5MB
		maxFiles: 5,
		colorize: false,
		format: winston.format.combine(
			winston.format.timestamp({
				format: 'YYYY-MM-DD HH:mm:ss'
			}),
			time
		)
	}
};

// Create the directory if it does not exist
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}

// instantiate a new Winston Logger with the settings defined above
const logger =  winston.createLogger({
	transports: [
		new winston.transports.File(options.file),
		new winston.transports.File(options.error),
	],
	exitOnError: false, // do not exit on handled exceptions
});


options.console.level = server.loglevel;
logger.add(new winston.transports.Console(options.console));

if (process.env.LOG_LEVEL === 'debug') {
	logger.add(new winston.transports.File(options.debug));
}


module.exports = logger;