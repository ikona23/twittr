var test = require('ava')
var _ = require('lodash')

var knex = require('../db')
var Post = require('../lib/posts')
var config = {directory: '../db/migrations'}

var tableName = Post.tableName

test.beforeEach(function () {
  return knex.migrate.latest(config).then(function () {
      return knex.seed.run().then(function() {
        console.log('Integration test db migration done...');
      })
  }) // create the tables on the test database
})

// drop the tables on the test database
test.afterEach.always(function () {
  return knex.migrate.rollback(config).then(function () {
    console.log('db rollback...');
  })
})

// instance tests
test('instance.save() saves a model instance in the database', function (t) {
  var data = {
    body: 'post of test',
    user_id: 1
  }

  Post.query()
  .insert(data)
  .then(function (createdPost) {
    // assertions
    t.true(createdPost instanceof Post)
    t.is(typeof createdPost.id, 'number')

    // ok it resolves with a Post with an id
    // but has it really been inserted into the database ?
    return Post.query()
    .where('id', createdPost.id)
    .select('*')
  })
  .then(function (posts) {
    var fetchedPost = posts[0]
    t.truthy(fetchedPost)

    _.each(data, function (value, key) {
      t.is(fetchedPost[key], value)
    })
  })
})

// test('instance.update() updates a row in the database', function (t) {
//   var personId = 1
//   var update = {email: 'test@test.com'}
//
//   return knex('person')
//     .select()
//     .where('id', personId)
//     .then(function (people) {
//       var person = new Person(people[0])
//       return person.update(update)
//     })
//     .then(function (updatedPerson) {
//       return knex('person')
//         .select()
//         .where('id', personId)
//     })
//     .then(function (people) {
//       var updatedPerson = people[0]
//
//       t.is(updatedPerson.email, update.email)
//     })
// })
