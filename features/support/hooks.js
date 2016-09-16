var config = require('../../config')
var app = require('../../app')
var knex = require('../../db') // yet to be added

var server

module.exports = function () {
  this.Before(function (scenario, callback) {
    console.log('migrating...')
    knex.migrate.rollback().then(function() {
      knex.migrate.latest()
        .then(function () {
          return knex.seed.run()
        })
        .then(function () {
          console.log('features test migration done...')
          console.log('server starting....')
          server = app.listen(config.proxy.port, function () {
          callback()
        })
      })
    })

  })
  this.After(function (scenario, callback) {
    knex.migrate.rollback()
      .then(function () {
        console.log('features test rollback done');
        console.log('server stopping....')
        server.close()
        callback()
      })
  })
}
