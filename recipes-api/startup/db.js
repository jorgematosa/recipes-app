const logger = require('./logger.js');
const config = require('config');
const admin = require('firebase-admin');
const serviceAccount = require('./../config/db/serviceAccount.json');

/**
 * Function to initialize the Firebase DB
 */
function db(){
    admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
    });

    var db = admin.firestore();

    return db;
}

module.exports.db = db;