const bodyParser = require('body-parser')
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn
const express = require('express')
const passport = require('passport')
const users = require('../lib/users')
var Post = require('../lib/posts')
const router = express.Router()
module.exports = router
router.use(bodyParser.urlencoded({ extended: false }))

router.get('/login', function (req, res) {
  res.render('login', { flash: req.flash('error') })
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
)

router.get('/logout', function (req, res) {
  req.logout()
  res.redirect('/login')
})

router.get('/',
  ensureLoggedIn(),
  function (req, res) {
    Post.query()
    .where('user_id', req.user.id)
    .orderBy('created_at', 'desc')
    .then(function (posts) {

      var newPosts = posts.map(function(post) {
        var date = new Date(post['created_at'])
        post['created_at'] = date.toString()
        return post
      })

      res.render('index', {user: req.user, posts: newPosts})
    })

  }
)
router.post('/addPost', function(req, res, next) {
  req.body.user_id = Number(req.body.user_id)
  req.body.created_at = Date.now()
  // res.send('got post')
  Post.query()
  .insert (req.body).then(function(){
    res.redirect('/')
  })

})
router.get('/register', function (req, res) {
  res.render('register', { flash: req.flash('error') })
})

router.post('/register',
  function (req, res, next) {
    users.exists(req.body.username)
      .then(function (exists) {
        if (exists) {
          req.flash('error', 'User already exists, sorry.')
          return res.redirect('/register')
        }

        // req.login() can be used to automatically log the user in after registering
        users.create(req.body.username, req.body.email, req.body.password)
          .then(function () { return res.redirect('/login')} )
          .catch(function (err) {
            console.error(err)
            next()
          })
      })
      .catch(function (err) {
        console.error(err)
        next()
      })
  },
  function (req, res) {
    req.flash('error', "Couldn't add user.")
    res.redirect('/register')
  }
)
