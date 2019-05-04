const express = require('express');
const app = express();
const logger = require('./startup/logger.js');
const config = require('config');
const apiServer = config.get('server');

require('./startup/routes')(app);
global.db = require('./startup/db').db();

// Starts the server
const port = apiServer.port || 3000;
const server = app.listen(port, () => logger.info(`Listening on port ${port}...`));

module.exports = server;