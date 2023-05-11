const { selectCategories, modelEndpoints, selectReviewById } = require("../models/model")

exports.getCategories = (req, res) => {
    return selectCategories().then((categories) => {
        res.status(200).send({categories : categories})
    })
}

exports.getEndpoints = (req, res) => {
    return modelEndpoints().then((endpoints) => {
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