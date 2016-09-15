var bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {
  getHash: getHash,
  verifyUser: verifyUser
}
function getHash (password) {
  var salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password, salt);
}

function verifyUser (user, password) {

  return bcrypt.compareSync(password, user.hash)
}
