const { categoryData } = require('../db/data/test-data')
const seed = require('../db/seeds/seed.js')
const connection = require('../db/connection.js')


exports.selectCategories = () => {
    return connection.query("SELECT * FROM categories;").then((result) => {
        return result.rows
    })

}


exports.selectReviewById = (request) => {
    return connection.query(`SELECT * FROM reviews WHERE review_id=$1`, [request]).then((result) => {
        if(result.rows.length=== 0){
            return Promise.reject({status : 404, msg : "Review not found!"})
           } 
        return result.rows
    })
}

// exports.selectReviews = () => {

// }