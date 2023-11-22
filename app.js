const express = require("express")
const { getTopics, getApi  } = require("./controllers/topics.controllers");
const { getArticles } = require("./controllers/articles.controllers")
const endPoints = require("./endpoints.json");
const app = express();

app.get("/api", getApi);

app.get("/api/topics", getTopics);

app.get("/api/articles",  getArticles);

module.exports = app;