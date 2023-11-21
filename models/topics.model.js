const db = require("../db/connection");

exports.selectTopics = () => {
    let queryString = `SELECT * FROM topics`
    return db.query(queryString).then(({rows}) => {
        return rows
    });
};

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