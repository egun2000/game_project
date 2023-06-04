const request = require('supertest')
const {categoryData, commentData, reviewData, userData} = require('../db/data/test-data/index.js')
const connection = require('../db/connection.js')
const seed = require('../db/seeds/seed.js')
const app = require('../app.js')
const json = require('../endpoints.json')


beforeEach(() => {return seed({categoryData, commentData, reviewData, userData})})
afterAll(() => { return connection.end()})

describe('/api/categories', () => {
    test('GET - 200 - responds with an array of category objects', () => {
        return request(app)
        .get('/api/categories')
        .expect(200)
        .then((response) => {
            const categories = response.body.categories
            expect(Array.isArray(categories)).toBe(true)
            categories.forEach((category) => {
                expect(typeof category.slug).toBe('string')
                expect(typeof category.description).toBe('string')
            })
        })
    })
})

describe('/api', () => {
    test('GET - 200 - responds with an JSON describing all the available endpoints on your API', () => {
        return request(app)
        .get('/api')
        .expect(200)
        .then((response) => {    
            const endpoints = response.body.endpoints
            expect(typeof endpoints).toBe('object')
            expect(endpoints).toEqual(json)
            })
        })
    })

describe('/api/reviews/:review_id', () => {
    test('GET - 200 - responds with a review object', () => {
        return request(app)
        .get('/api/reviews/3')
        .expect(200)
        .then((response) => {
            const body = response.body.review
            body.forEach((review) => {
                expect(typeof review.votes).toBe('number')
                expect(typeof review.title).toBe('string')
                expect(typeof review.category).toBe('string')
                expect(typeof review.owner).toBe('string')
                expect(typeof review.review_id).toBe('number')

            })
        })
    })
    test('GET - 404 - review not found', () => {
        return request(app)
        .get('/api/reviews/112')
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe('Review not found!')
        })
    })
    
})
describe('/api/reviews', () => {
    test('GET - 200 - responds with an array of review objects sorted by date in descending order', () => {
        return request(app)
        .get('/api/reviews')
        .expect(200)
        .then((response) => {
            const body = response.body.reviews
            expect(body).toBeSortedBy("created_at", {
                descending: true,
              });
              body.forEach((review) => {
                expect(typeof review.votes).toBe('number')
                expect(typeof review.title).toBe('string')
                expect(typeof review.category).toBe('string')
                expect(typeof review.owner).toBe('string')
                expect(typeof review.review_id).toBe('number')
                expect(typeof review.comment_count).toBe('number')
              })
        })
    })
})

describe('/api/reviews/:review_id/comments', () => {
    test('GET - 200 - responds with comments relating to an array', () => {
        return request(app)
        .get('/api/reviews/3/comments')
        .expect(200)
        .then((response) => {
            const body = response.body.comments
            expect(body).toBeSortedBy("created_at", {
                descending: true,
              })
            body.forEach((comment) => {
                expect(typeof comment.comment_id).toBe('number')
                expect(typeof comment.votes).toBe('number')
                expect(typeof comment.body).toBe('string')
                expect(typeof comment.author).toBe('string')
                expect(typeof comment.review_id).toBe('number')
                expect(typeof comment.created_at).toBe('string')    
            })
        })
    })
    test('GET - 200- responds with comment not found', () => {
        return request(app)
        .get('/api/reviews/1/comments')
        .expect(200)
        .then((response) => {
            console.log(response.body)
            expect(response.body.comments).toBe('This Review has no comments!')
        })
    })
})

describe('/api/reviews/:review_id/comments', () => {
    test('POST - 201 - accepts a request body with username and body properties', () => {
        return request(app)
        .post('/api/reviews/1/comments')
        .send({
            username: 'bainesface',
            body: 'This is my new comment'
        })
        .expect(201)
        .then((response) => {
            const body = response.body.comment
            
            expect(body.author).toBe('bainesface')
            expect(body.body).toBe('This is my new comment')
            expect(body.review_id).toBe(1)
            expect(body.votes).toBe(0)
        })
    })
})

describe('/api/reviews/:review_id', () => {
    test('PATCH - 200 - accepts a request body which increments votes on a review and responds with updated review', () => {
        return request(app)
        .patch('/api/reviews/1')
        .send({
            inc_votes: 3
        })
        .expect(200)
        .then((response) => {
            const body = response.body.review
            expect(body.review_id).toBe(1)
            expect(body.votes).toBe(4)
        })
    })
})