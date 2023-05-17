const { pool } = require("./connection")
const { migrationQuery, register, getUserByUsername, getAllUser } = require("./query")

module.exports = {
  setupDB: (cb) => {
    pool.query(migrationQuery, (err) => {
      if (err) return console.error(err.message)
      console.log(`Migration users success`)

      pool.query(register, (err) => {
        if (err) return console.error(err)

        pool.query(getUserByUsername, (err) => {
          if (err) return console.error(err)

          pool.query(getAllUser, (err) => {
            if (err) return console.error(err)
            console.log('created stored procedure')
            pool.end()

            cb()
          })
        })

      })
    })
  }
}