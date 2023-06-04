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

exports.selectReviews = () => {
    
    // console.log(commentCount)
    return connection.query(`SELECT reviews.review_id, reviews.owner, reviews.title, reviews.category, reviews.created_at, reviews.votes, reviews.review_img_url, COUNT(comments.review_id)::INT as comment_count
    FROM reviews
    LEFT JOIN comments ON reviews.review_id = comments.review_id
    GROUP BY reviews.review_id
    ORDER BY reviews.created_at DESC;`)
    
    .then((result) => {
        return result.rows
    })

}

exports.selectReviewComments = (request) => {
    return connection.query(`SELECT * FROM comments WHERE review_id=$1 ORDER BY created_at DESC`, [request]).then((result) => {
        // if(result.rows.length=== 0){
        //     return Promise.reject({status : 404, msg : "Comment not found!"})
        //    } 
        return (result.rows)
    })
}

exports.addReviewComments = (body, id) => {
    const commentData = [
        body.username,
        body.body,
        id
    ]
    return connection.query(`
    INSERT INTO comments
    (author, body, review_id)
    VALUES
    ($1, $2, $3)
    RETURNING *
    `, commentData)
    .then((result) =>{ return result.rows[0]}
    )}

exports.incReviewVotes = (body, id) => {
    const voteData = [body, id]
    return connection.query(`
    UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *
    `, voteData)
    .then((result) => {
        return result.rows[0]
    })
}