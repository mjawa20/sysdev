const { pool } = require("../db/connection")
const { hashPassword, validatePassword } = require("../helpers/bcrypt")
const { writeLog } = require("../helpers/log")

class Model {
  static register(data, callback) {
    const errors = this.validate(data)
    if (errors.length) {
      return callback({ name: 'ValidationError', errors })
    }

    const query = `CALL register(?, ?, ?)`

    const { password, username, age } = data
    pool.query(query, [username, hashPassword(password), age], (err, res) => {
      if (err) return callback({ name: 'err', errors: err.message })

      writeLog(`Added user with username ${username} at ${new Date().toISOString()} \n`)
      callback(null, res)
    })
  }

  static listUser(callback) {
    const query = `CALL getAllUser()`

    pool.query(query, (err, res) => {
      if (err) return callback({ name: 'err', errors: err.message })

      writeLog(`Get all data user at ${new Date().toISOString()} \n`)
      callback(null, res)
    })
  }

  static login(data, callback) {

    const query = `CALL getUserByUsername(?)`

    const { username, password } = data
    pool.query(query, [username], (err, res) => {
      if (err) return callback({ name: 'err', errors: err.message })
      const user = res[0][0]
      if (!user || !validatePassword(password, user.password)) return callback({ name: 'ValidationError', errors: 'Email or password incorrect' })

      writeLog(`Get user data login at ${new Date().toISOString()} \n`)
      callback(null, res[0][0])
    })
  }

  static validate(data) {
    const { password, confirm, username, age } = data
    let errors = []
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;


    Object.keys(data).forEach(key => {
      if (!data[key]) errors.push(`${key} is required`)
    })

    if (!validRegex.test(username)) errors.push('Invalid format username must email')

    if (password.length < 6) errors.push('Password length minimum 6')

    if (!/\d/.test(password) || !/[A-Z]/.test(password)) errors.push('Password must include number and capital letter')

    if (password != confirm) errors.push('Confirm password not match with password')

    return errors

  }


}

module.exports = Model
