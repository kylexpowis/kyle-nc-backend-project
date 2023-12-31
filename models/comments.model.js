const db = require("../db/connection")

exports.deleteComment = (comment_id) => {
    return db.query("DELETE FROM comments WHERE comment_id = $1 RETURNING *", [comment_id])
        .then(({ rows }) => {
            if (rows.length === 0) {
                return Promise.reject({ status: 404, msg: "Not Found" });
            }
            return rows[0];
        });
    return db.query(`DELETE FROM comments
    WHERE comment_id = $1`, [comment_id]);
};