const express = require("express")
const { getTopics, getApi } = require("./controllers/topics.controllers");
const { selectArticlebyId, postComment } = require("./controllers/articles.controllers");
const endPoints = require("./endpoints.json");
const app = express();

app.use(express.json());

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", selectArticlebyId)

app.post("/api/articles/:article_id/comments", postComment)

app.use((err, req, res, next) => {
    console.log(err);
    const status = err.status || 500;
    const message = err.msg || "Internal Server Error";
    if (err.code === "22P02") {
        res.status(400).send({ msg: "Bad Request Invalid Article ID"})
    } else {
        if (err.code === "23502") {
            res.status(400).send({ msg: "Bad Request Body" })
        }
    }
    console.log(err, "ERROR")
    res.status(status).send({ msg: message });
})

module.exports = app;