const db = require("../db/connection");

exports.selectTopics = () => {
    console.log("HELLO FROM MODEL!")
    let queryString = `SELECT * FROM topics`
    return db.query(queryString).then(({rows}) => {
        return rows
    })
}
