
const express = require('express');
const recipe = require('./../routes/recipe');
const api = require('config').get('api');

/**
 * Main api endpoints declarations
 */

module.exports = function(app) {
    app.use(express.json()); 
    app.use(api.api_url + api.recipes, recipe);
}