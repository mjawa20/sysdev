const Model = require('../models/model')

class Controller {
  static login(req, res) {
    const { errors } = req.query

    res.render('login', { errors })
  }

  static postLogin(req, res) {
    Model.login(req.body, (err, data) => {
      if (err) {
        res.redirect('/?errors=' + err.errors)
        return
      }

      res.redirect('/data')
    })
  }


  static register(req, res) {
    const { errors } = req.query

    res.render('register', { errors })
  }

  static postRegister(req, res) {
    Model.register(req.body, (err, data) => {
      if (err) {
        res.redirect('/register?errors=' + err.errors)
        return
      }

      res.redirect('/')
    })
  }

  static data(req, res) {
    Model.listUser((err, data) => {
      res.render('data', { user: data[0] })
    })
  }
}

module.exports = Controller
