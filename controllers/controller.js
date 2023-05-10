const { selectCategories, modelEndpoints } = require("../models/model")

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

// exports.getReviewById = (req, res) => {
//     console.log('im in review controller')
// }