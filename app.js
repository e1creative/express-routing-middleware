const express = require('express');
const itemRoutes = require('./itemRoutes')
const ExpressError = require('./express-error')

const app = express();


// tell our app to use json for the incoming body request
app.use(express.json())


// declare our routes base and tell our app to use the routes defined in ./itemRoutes
app.use('/items', itemRoutes)


// 404 handler
app.use((request, response, next) => {
    const e = new ExpressError('Page Not Found', 404)
    next(e);
})


// our error handler to be called when we pass a value to next()
app.use((error, request, response, next) => {
    let status = error.status || 500;
    let message = error.message

    return response.status(status).json(
        { error: { message, status } }
    ) 
})

module.exports = app;