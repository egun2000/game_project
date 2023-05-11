
const { getCategories } = require('./controllers/controller')
const express = require('express')
const app = express()

app.use(express.json())
console.log('im in the app')

app.get('/api/categories', getCategories)

module.exports = app