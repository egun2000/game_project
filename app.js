
const { getCategories, getReviewById, getEndpoints, getReviews, getReviewComments, postReviewComments, patchReviewVotes } = require('./controllers/controller')
const express = require('express')
const app = express()
const cors = require('cors')
// const port = 3000;
app.use(cors())

app.use(express.json())

app.get('/api', getEndpoints)

app.get('/api/categories', getCategories)

app.get('/api/reviews/:review_id', getReviewById)

app.get('/api/reviews', getReviews)

app.get('/api/reviews/:review_id/comments', getReviewComments)

app.post('/api/reviews/:review_id/comments', postReviewComments)

app.patch('/api/reviews/:review_id', patchReviewVotes)

app.use((err, req, res, next) => {
    if (err.status && err.msg) {
      res.status(err.status).send({ msg: err.msg });
    } else {
      next(err);
    }
  })

  // app.get('/', (req, res) => {
  //   res.send('Hello, World!');
  // });
  
  // app.listen(port, () => {
  //   console.log(`Server app listening at http://localhost:${port}`);
  // });

module.exports = app