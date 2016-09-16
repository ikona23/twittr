var Model = require('objection').Model;
var knex = require('../db')
console.log('knex', knex);

function Posts() {
  Model.apply(this, arguments);
}

Posts.prototype.$beforeInsert = function (){
  this.created_at = Date.now()
}

Model.extend(Posts);
Model.knex(knex)
Posts.tableName = 'posts'

module.exports = Posts;
