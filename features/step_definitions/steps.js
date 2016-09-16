var assert = require('cucumber-assert')
var Url = require('url')
var extend = require('xtend')

var config = require('../../config')

module.exports = function () {

  this.Given('I am viewing the page at "$string"', function (pathname) {
    browser.url(`http://localhost:5050${pathname}`) // hardcoded localhost
    // real world example below
    // browser.url(Url.format(extend(config.proxy, { pathname: pathname })))
  })

  this.When('I click on the link "$string"', function (text) {
    browser.click(`a[href="${text}"]`)
  })

  this.When('I click on the input with value "$string"', function (text) {
    browser.click(`input[value="${text}"]`)
  })

  this.Then('I can see an input named "$string"', function (text, callback) {
    var inputExists = browser.waitForExist(`input[name="${text}"`)
    assert.equal(inputExists, true, callback)
  })

  this.Then('I can see the p item with value "$string"', function (text, callback) {
    var inputExists = browser.waitForExist(`p=${text}`)
    assert.equal(inputExists, true, callback)
  })

  this.When('I enter "$string" into the "$string" input', function (value, name) {
    browser.setValue(`input[name=${name}]`, value)
  })

  //
  // this.Then('I am redirected to the "$string" page', function (pathname, callback) {
  //   browser.waitForExist('body')
  //   var url = browser.getUrl()
  //   assert.equal(Url.parse(url).pathname, pathname, callback)
  // })
}
