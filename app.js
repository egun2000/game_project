
const { getCategories, getReviewById, getEndpoints } = require('./controllers/controller')
const express = require('express')
const app = express()


app.use(express.json())

app.get('/api', getEndpoints)

app.get('/api/categories', getCategories)

// app.get('/api/reviews/:review_id', getReviewById)

module.exports = app