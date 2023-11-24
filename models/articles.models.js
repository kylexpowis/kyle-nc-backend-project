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

exports.postComment = (article_id, passedComment) => {
    const { username, body } = passedComment
    return db.query(`INSERT INTO comments (article_id, author, body)
    VALUES ($1, $2, $3)
    RETURNING *;`,
    [article_id, username, body])
    .then(({ rows: [insertedComment] }) => {
        return insertedComment;
    });
    }