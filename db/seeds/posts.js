
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('posts').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('posts').insert({body: 'post1', created_at: Date.now(), user_id: 1}),
        knex('posts').insert({body: 'post2', created_at: Date.now(), user_id: 1}),
        knex('posts').insert({body: 'post3', created_at: Date.now(), user_id: 1})
      ]);
    });
};
