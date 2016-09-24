
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('follow').del(),

    // Inserts seed entries
    knex('follow').insert({follower: 1, followee: 4}),
    knex('follow').insert({follower: 2, followee: 4}),
    knex('follow').insert({follower: 3, followee: 4})
  );
};
