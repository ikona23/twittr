var Model = require('objection').Model;

function Posts() {
  Model.apply(this, arguments);
}

Posts.prototype.$beforeInsert = function (){
  this.created_at = Date.now()
}

Model.extend(Posts);

MinimalModel.tableName = 'Posts'

module.exports = Posts;
