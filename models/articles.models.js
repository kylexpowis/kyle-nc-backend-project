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
    const queryString = `SELECT comment_id,
    votes,
    created_at,
    author,
    body,
    article_id
    FROM comments WHERE article_id = $1
    ORDER BY created_at DESC;`;
    return db.query(queryString, [article_id])
    .then(({ rows }) => {
        return rows
    })
}
exports.selectArticles = () => {
    let queryString = `SELECT articles.author,
    articles.title,
    articles.article_id,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.article_img_url,
    COUNT(comments.comment_id) AS comment_count
    FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;`;
    return db.query(queryString)
    .then(({ rows }) => {
        return rows;
    });
};

exports.updateArticleVote = (article_id, inc_votes) => {
    const queryString = `UPDATE articles
    SET votes = votes + $2
    WHERE article_id = $1
    RETURNING *;`;
    return db.query(queryString, [article_id, inc_votes]).then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "Article Not Found"});
        }
        return rows[0]
    })
} 