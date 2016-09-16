var config = require('../../config')
var app = require('../../app')
var knex = require('../../db') // yet to be added

var knexConfig = {directory: './db/migrations'}
var server

module.exports = function () {

  this.registerHandler('BeforeFeatures', (features, callback) => {
    console.log('migrating...')
    knex.migrate.latest(knexConfig)
      .then(function () {
        return knex.seed.run()
      })
      .then(function () {
        console.log('server starting....')
        server = app.listen(config.proxy.port, function () {
          callback()
      })
    })
  })

  this.registerHandler('AfterFeatures', (features, callback) => {
    knex.migrate.rollback(knexConfig)
      .then(function () {
        console.log('server stopping....')
        server.close()
        callback()
      })
  })
}
