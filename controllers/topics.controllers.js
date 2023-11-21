const { selectTopics, selectArticlebyId } = require("../models/topics.model");
const endPoints = require ("../endpoints.json");



exports.getTopics = (req, res, next) => {
    selectTopics()
    .then((topics) => {
        res.status(200).send({topics});
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
};

exports.getApi = (req, res) => {
    res.status(200).send({data: endPoints});
};

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