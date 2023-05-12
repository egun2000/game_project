
const { getCategories, getReviewById, getEndpoints, getReviews } = require('./controllers/controller')
const express = require('express')
const app = express()


app.use(express.json())

app.get('/api', getEndpoints)

app.get('/api/categories', getCategories)

app.get('/api/reviews/:review_id', getReviewById)

app.get('/api/reviews', getReviews)

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    } else {
      next(err);
    }
  })

module.exports = app