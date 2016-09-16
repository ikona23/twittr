var Model = require('objection').Model;
var knex = require('../db')

function Posts() {
  Model.apply(this, arguments);
}

Model.extend(Posts);
Model.knex(knex)
Posts.tableName = 'posts'

module.exports = Posts;
