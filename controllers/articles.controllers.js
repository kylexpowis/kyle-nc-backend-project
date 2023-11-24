const { selectArticlebyId, postComment } = require("../models/articles.models");
const endPoints = require ("../endpoints.json");

exports.selectArticlebyId = (req, res, next) => {
    const { article_id } = req.params;
    selectArticlebyId(article_id)
    .then((article) => {
        res.status(200).send({ article });
    })
    .catch((err) => {
        next(err)
    });
};

exports.postComment = (req, res, next) => {
    const { article_id } = req.params;
    const passedComment = req.body;
    
        if (!passedComment.username || !passedComment.body) {
            return res.status(400).send({ msg: "Bad Request"})
        }

    postComment(article_id, passedComment)
        .then((postedComment) => {
            console.log(postedComment, "POSTED COMMENT")
            res.status(201).send({postedComment});
        })
        .catch((err) => {
            next(err);
})}