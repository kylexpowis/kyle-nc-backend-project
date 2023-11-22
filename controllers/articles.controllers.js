const { selectArticlebyId, selectCommentsByArticleId } = require("../models/articles.models");
const endPoints = require ("../endpoints.json");

exports.selectArticlebyId = (req, res, next) => {
    const { article_id } = req.params;
    selectArticlebyId(article_id)
    .then((article) => {
        res.status(200).send({ article });
    })
    .catch((err) => {
        console.log(err);
        next(err)
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    selectCommentsByArticleId(article_id)
    .then((comments) => {
        res.status(200).send({ comments });
    })
    .catch((err) => {
        console.log(err);
        next(err);
    })
}