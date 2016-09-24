
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('users').del(),

    // Inserts seed entries
    knex('users').insert({id: 1, username: 'user1'}),
    knex('users').insert({id: 2, username: 'user2'}),
    knex('users').insert({id: 3, username: 'user3'}),
    knex('users').insert({id: 4, username: 'user4'})
  );
};
