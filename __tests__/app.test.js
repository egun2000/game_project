const request = require('supertest')
const {categoryData, commentData, reviewData, userData} = require('../db/data/test-data/index.js')
const connection = require('../db/connection.js')
const seed = require('../db/seeds/seed.js')
const app = require('../app.js')


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