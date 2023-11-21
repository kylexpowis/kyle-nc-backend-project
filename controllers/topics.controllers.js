const { selectTopics } = require("../models/topics.model");

exports.getTopics = (req, res, next) => {
    console.log("HELLO FROM CONTROLLER!!")
    selectTopics()
    .then((topics) => {
        res.status(200).send({topics});
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })
};