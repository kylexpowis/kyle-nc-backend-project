const express = require("express")
const { getTopics, getApi, selectArticlebyId  } = require("./controllers/topics.controllers");
const endPoints = require("./endpoints.json");
const app = express();

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles/:article_id", selectArticlebyId)

app.use((err, req, res, next) => {
    if (err.status) {
      res.status(err.status).send({ msg: err.msg });
    } else {
      res.status(500).send({ msg: "Internal Server Error" });
    }
});

module.exports = app;