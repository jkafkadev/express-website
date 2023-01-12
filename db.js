const mysql = require("mysql")
const dbconfig = require("./db-config.json")

let connPool = mysql.createPool(dbconfig)
module.exports = {
    addRow: (t, e, u, l, c, m) => {
        return new Promise((resolve, reject) => {
            const sql = `insert into contactMe 
            (title, email, username, link, category, message) values (?, ?, ?, ?, ?, ?)`
            connPool.query(sql, [t, e, u, l, c, m], (err, rows) => {
                if (err) reject(err)
                else resolve(rows)
            })
        })
    },
    getAll: () => {
        return new Promise((resolve, reject) => {
            const sql = 'select * from contactMe'
            connPool.query(sql, (err, rows) => {
                if (err) reject(err)
                else resolve(rows)
            })
        })
    },
    getFilter: (column) => {
        return new Promise((resolve, reject) => {
            const sql = 'select * from contactMe where category = ?'
            connPool.query(sql, [column], (err, rows) => {
                if (err) reject(err)
                else resolve(rows)
            })
        })
    }
}