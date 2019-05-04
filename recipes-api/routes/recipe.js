const express = require('express');
const router = express.Router();

// Configuration parameters
const logger = require('../startup/logger.js');

/**
 * Enables CORS for all routes
 */
router.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

/**
 * Route to add a recipe in firebase (Dind't have time to implement the front-end for this part)
 */
router.post('/addRecipe', async (req, res) => {
	var docRef = db
		.collection('recipes')
		.add(req.body)
		.then(ref => {
            logger.info('Recipe successfully saved');
	        res.status(res.statusCode).send('Recipe saved with id: '+ ref.id);   
		});
});

/**
 * Route to update the favourite field of the object
 */
router.post('/updateRecipe', async (req, res) => {
	var docRef = db.collection('recipes').doc(req.body.id)
	var updateSingle = docRef.update({isFavourite: req.body.isFavourite});
	logger.info('Recipe successfully updated');
	res.status(res.statusCode).send('done');  
});

/**
 * Route that returns all recipes
 */
router.get('/', async (req, res) => {
	db.collection('recipes')
		.get()
		.then(snapshot => {
			let resBody = [];
			snapshot.forEach(doc => {
				resBody.push([doc.data(), doc.id]);
            });
            logger.info('Recipes successfully loaded');            
			res.status(res.statusCode).send(resBody);
		})
		.catch(err => {
			console.log('Error getting documents', err);
		});
});

module.exports = router;
