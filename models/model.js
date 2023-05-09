const { categoryData } = require('../db/data/test-data')
const seed = require('../db/seeds/seed.js')
const connection = require('../db/connection.js')

exports.selectCategories = () => {
    console.log('im in model')
    return connection.query("SELECT * FROM categories;").then((result) => {
        return result.rows
    })

}