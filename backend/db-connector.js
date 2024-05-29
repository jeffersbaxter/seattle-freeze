/**
 * Citation for the following file:
 * Date: 5/24/2024
 * Adapted from Activity 2
 * Jeffers replaced example placeholders with his database credentials.
 * Source URL: https://canvas.oregonstate.edu/courses/1958399/assignments/9589645?module_item_id=24181790
 */

var mysql = require('mysql')
require("dotenv").config();

// Establish a connection with Seattle Freeze DB
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : process.env.HOST,
    user            : process.env.USER,
    password        : process.env.PASSWORD,
    database        : process.env.DB
});

// Export it for use in our application
module.exports.pool = pool;