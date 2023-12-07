const { deleteComment } = require("../models/comments.model");
const endPoints = require("../endpoints.json")

exports.removeCommentById = (req, res, next) => {
    const { comment_id } = req.params;
    deleteComment(comment_id)
    .then(() => {
        res.status(204).end();
    })
    .catch((err) => {
        console.log(err)
        next(err)
    })


}


