const { selectCategories } = require("../models/model")

exports.getCategories = (req, res) => {
    console.log('im in the controller')
    return selectCategories().then((categories) => {
        res.status(200).send({categories : categories})
    })
}