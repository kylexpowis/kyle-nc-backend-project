const db = require("../db/connection");

exports.selectArticlebyId = (article_id) => {
    let queryString = `SELECT * FROM articles WHERE article_id = $1`;
    return db.query(queryString, [article_id])
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Article Not Found"});
        }
        return rows[0];
    })
}

exports.selectCommentsByArticleId = (article_id) => {
    let queryString = `SELECT comment_id,
    votes,
    created_at,
    author,
    body,
    article_id
    FROM comments WHERE article_id = $1
    ORDER BY created_at DESC;`;
    return db.query(queryString, [article_id])
    .then(({ rows }) => {
        return rows;
    });
};