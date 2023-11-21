const express = require("express")
const { getTopics, getApi  } = require("./controllers/topics.controllers");
const endPoints = require("./endpoints.json");
const app = express();

app.get("/api", getApi);

app.get("/api/topics", getTopics);

module.exports = app;