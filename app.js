const express = require("express")
const { getTopics, getApi } = require("./controllers/topics.controllers");
const { selectArticlebyId, getCommentsByArticleId, getArticles } = require("./controllers/articles.controllers");
const endPoints = require("./endpoints.json");
const app = express();

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", selectArticlebyId)

app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.use((err, req, res, next) => {
    console.log(err);
    const status = err.status || 500;
    const message = err.msg || "Internal Server Error";
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Bad Request Invalid Article ID"})
    }
    res.status(status).send({ msg: message });
})
app.get("/api/articles",  getArticles);

module.exports = app;
