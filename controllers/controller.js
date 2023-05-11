const { selectCategories, modelEndpoints, selectReviewById } = require("../models/model")
const fs = require('fs/promises')

exports.getCategories = (req, res) => {
    return selectCategories().then((categories) => {
        res.status(200).send({categories : categories})
    })
}

exports.getEndpoints = (req, res) => {
    
    return fs.readFile(`${__dirname}/../endpoints.json`, 'utf-8')
    .then((response) => {
        const endpoints = JSON.parse(response)
        res.status(200).send({endpoints : endpoints})
    })
}

exports.getReviewById = (req, res, next) => {
    const request= req.params.review_id
    return selectReviewById(request).then((review) => {      
        res.status(200).send({review : review})
    })
    .catch((err) => {
        next(err)
    })
}

// exports.getReviews = (req, res) => {

// }
