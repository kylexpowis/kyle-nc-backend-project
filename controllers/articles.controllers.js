const { selectArticlebyId, selectArticles } = require("../models/articles.models");
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

exports.getArticles = (req, res, next) => {
    selectArticles()
    .then((articles) => {
        res.status(200).send({ articles });
    })
    .catch((err) => {
        console.log(err);
        next(err)
    });
};