
exports.up = function(knex, Promise) {
  return knex.schema.createTable('follow', function (table) {
    table.integer('follower')
    table.integer('followee')
    table.foreign('follower').references('user.id')
    table.foreign('followee').references('user.id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('follow')
};
