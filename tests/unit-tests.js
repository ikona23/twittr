var test = require('ava')
var util = require('util')
var _ = require('lodash')

var Model = require('../lib/model')
var schema = {
  type: 'object',
  properties: {
    name: {type: 'string'},
    email: {type: 'string'}
  }
}
// inherit from the Model prototype
function Person () {
  Model.apply(this, arguments)
}
util.inherits(Person, Model)

// give Person methods 
Model.extend(Person)

test('Subsonstructor.jsonSchema() sets the jsonSchema on the prototype', function (t) {
  Person.jsonSchema(schema)

  t.deepEqual(Person.prototype.jsonSchema, schema)
})

test('instance.validate() validates its properties', function (t) {
  Person.jsonSchema(schema)
  var data = {name: 'Selina Kyle', email: 'selina@ilovecats.com'}
  var catwoman = new Person(data)

  t.is(typeof catwoman.validate, 'function')
  t.is(catwoman.validate().errors.length, 0)
})

test('instance.validate() does not validate incorrect', function (t) {
  Person.jsonSchema(schema)
  var data = {name: 5371, email: 49494.022}
  var person = new Person(data)
  
  t.not(person.validate().errors.length, 0)
})
