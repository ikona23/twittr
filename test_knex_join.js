var knex = require('./db')
knex('follow')
.join('users as u1', 'u1.id', 'follow.follower')
.join('users as u2', 'u2.id', 'follow.followee')
.select('u1.username as follower_name', 'u2.username as followee_name')
.then(follows => {
  follows.map((follow) => {
    console.log(follow.follower_name + " -> " + follow.followee_name);
  })
})
