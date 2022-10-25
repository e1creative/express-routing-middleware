const express = require('express');
const router = new express.Router();
const ExpressError = require('./express-error')
// import our fake database for this exercise
const items = require('./fakeDb')

/**
 * begin our routes for /items
 */

// this should render a list of shopping items.
router.get('/', function(req, res, next) {
    try {
        return res.status(200).json({ items: items })
    } catch(e) {
        next(e)
    }
})


//this route should accept JSON data and add it to the shopping list.
router.post('/', function(req, res, next) {
    try {
        // if(req.body.name) throw new ExpressError('Please provide an item to add, along with a price', 400)
        const newItem = { name: req.body.name, price: req.body.price}
        items.push(newItem)
        return res.status(201).json({added: newItem})
    } catch(e) {
        next(e)
    }
})


//this route should display a single item’s name and price.
router.get('/:name', function(req, res, next) {
    try {
        // find the item using .find()
        const foundItem = items.find((item) => item.name === req.params.name)

        // if foundItem returns undefined, throw a new error
        if (foundItem === undefined) throw new ExpressError('Item not found!', 404)

        // return the found item
        return res.json({item: foundItem})
    } catch(e) {
        next(e)
    }
})


// this route should modify a single item’s name and/or price.
router.patch('/:name', function(req, res, next) {
    try {
        const foundItem = items.find((item) => item.name === req.params.name)

        // if foundItem returns undefined, throw a new error
        if (foundItem === undefined) throw new ExpressError('Item not found!', 404)

        foundItem.name = req.body.name
        foundItem.price = req.body.price

        return res.status(201).json({updated: foundItem})
    } catch(e) {
        next(e)
    }
})


//this route should allow you to delete a specific item from the array.
router.delete('/:name', function(req, res, next) {
    try {
        const foundItem = items.find((item) => item.name === req.params.name)

        // if foundItem returns undefined, throw a new error
        if (foundItem === undefined) throw new ExpressError('Item not found!', 404)

        // delete the item from our list
        items.splice(foundItem, 1)

        return res.json({"message": "Deleted"})
    } catch(e) {
        next(e)
    }
})


module.exports = router