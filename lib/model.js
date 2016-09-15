// from your-own-orm

var _ = require('lodash')
var Validator = require('jsonschema').Validator
var v = new Validator()

function Model (properties) {
  this.properties = properties
  this.id = properties.id
}

Model.knex = function (knex) {
  this.prototype.knex = knex
  this.knex = knex
}

var methods = {

  tableName: function (tableName) {
    this.tableName = tableName
    this.prototype.tableName = tableName
  },

  jsonSchema: function (jsonSchema) {
    this.prototype.jsonSchema = jsonSchema
  },

  destroy: function (query) {
  },

  all: function (columns) {
    return this.prototype.knex(this.tableName)
      .select(columns || '*')
  },

  where: function (query, columns) {
  }
}

// give the subconstructor all the aove methods
// e.g. Person.all()
//        .then()
Model.extend = function (subconstructor) {
  _.each(methods, function (method, methodName) {
      subconstructor[methodName] = method
   })
}

// prototype methods are available on model instances
// var person = new Person(data)
// person.save()
//                   VV -must name the function -VV
Model.prototype.save = function save () {
  return this.knex(this.tableName)
    .insert(this.properties)
    .then(function (ids) {
      this.id = ids[0]
      return this
    }.bind(this))
}

Model.prototype.update = function update (update) {
}

Model.prototype.toJSON = function toJSON () {
}

Model.prototype.validate = function validate () {
}

module.exports = Model
Contact GitHub API Training Shop Blog About
