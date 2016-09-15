var assert = require('cucumber-assert')
var Url = require('url')
var extend = require('xtend')

var config = require('../../config')

module.exports = function () {

  this.Given('I am viewing the page at "$string"', function (pathname) {
    console.log('pathname', pathname)
    browser.url(`http://localhost:5050${pathname}`) // hardcoded localhost
    // real world example below
    // browser.url(Url.format(extend(config.proxy, { pathname: pathname })))
  })
  //
  // this.When('I enter "$string" into the "$string" input', function (value, name) {
  //   browser.setValue(`input[name=${name}]`, value)
  // })
  //
  // this.When('I click on the input with value "$string"', function (value) {
  //   browser.click(`input[value="${value}"]`)
  // })
  //
  // this.Then('I can see the list item "$string"', function (text, callback) {
  //   var listItemExists = browser.waitForExist(`li=${text}`)
  //   assert.equal(listItemExists, true, callback)
  // })
  //
  // this.Then('I am redirected to the "$string" page', function (pathname, callback) {
  //   browser.waitForExist('body')
  //   var url = browser.getUrl()
  //   assert.equal(Url.parse(url).pathname, pathname, callback)
  // })
}
