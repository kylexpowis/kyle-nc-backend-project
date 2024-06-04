const {
  selectArticlebyId,
  selectCommentsByArticleId,
  selectArticles,
  updateArticleVote,
  postComment,
} = require("../models/articles.models");

const endPoints = require("../endpoints.json");

exports.selectArticlebyId = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlebyId(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const passedComment = req.body;

  if (!passedComment.username || !passedComment.body) {
    return res.status(400).send({ msg: "Bad Request" });
  }

  postComment(article_id, passedComment)
    .then((postedComment) => {
      res.status(201).send({ postedComment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  selectCommentsByArticleId(article_id)
    .then((comments) => {
      if (comments.length === 0) {
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      }
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getArticles = (req, res, next) => {
  selectArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.updateArticleVotesById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  updateArticleVote(article_id, inc_votes)
    .then((updatedArticle) => {
      res.status(200).send({ article: updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticlesByTopic = async (req, res, next) => {
  try {
    const { topic } = req.query;
    if (!topic) {
      const articles = await fetchAllArticles();
      res.status(200).json({ articles });
    } else {
      const articles = await fetchArticlesByTopic(topic);
      res.status(200).json({ articles });
    }
  } catch (err) {
    next(err);
  }
};
