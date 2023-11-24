const { selectArticlebyId, selectCommentsByArticleId, selectArticles, postComment } = require("../models/articles.models");

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
            res.status(201).send({postedComment});
        })
        .catch((err) => {
            next(err);
})}

exports.getCommentsByArticleId = (req, res, next) => {
    const { article_id } = req.params;
    selectCommentsByArticleId(article_id)
    .then((comments) => {
        if(comments.length === 0) {
            return Promise.reject({ status: 404, msg: "Article Not Found"});
        }
        console.log(comments, "<----- INSIDE")
        res.status(200).send({ comments });
    })
    .catch((err) => {
        next(err);
    })
}
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
