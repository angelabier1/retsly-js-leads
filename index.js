var $ = require('dom')
var validate = require('validate-form')
var template = require('./templates/template')
var ajax = require('ajax')
var cookie = require('cookie')

module.exports = function(opts) {
  if(!opts) throw new Error('no options passed into retsly-js-leads')
  if(!opts.retsly) throw new Error('no Retsly instance passed into retsly-js-leads')
  if(!opts.agent_id) throw new Error('no agent_id passed into retsly-js-leads')
  if(!opts.vendor_id) throw new Error('no vendor_id passed into retsly-js-leads')
  if(!opts.listing_id) throw new Error('no listing_id passed into retsly-js-leads')

  this.retsly = opts.retsly
  this.agent_id = opts.agent_id
  this.vendor_id = opts.vendor_id
  this.listing_id = opts.listing_id
  this.site_id = opts.site_id

  var tpl = template()

  var Components = {}

  Components.ContactForm = function(el) {
    if (!el) throw new Error('no el passed into retsly-js-leads#Contactform')
    this.el = el
    $(this.el).append(tpl)

    // events
    $('.tab-left #commentSpan').on('click', function(e) {
      $('#commentdiv').toggleClass('toggled')
    })

    $('.tab-right .send-button').on('click', function(e) {
      e.preventDefault()
      submitForm()
    })

    var thisElement = $('.presented-by').find('#lead')
    checkCookie(thisElement)

    // preload input fields if cookie exists with name, email, phone
    function checkCookie() {
      if(cookie('name')) {
        thisElement.find('#namefield').val(cookie('name'))
      }
      if(cookie('email')) {
        thisElement.find('#emailfield').val(cookie('email'))
      }
      if(cookie('phone')) {
        thisElement.find('#telfield').val(cookie('phone'))
      }
    }

    function submitForm() {
      var name = $('#namefield').val()
      var tel = $('#telfield').val()
      var email = $('#emailfield').val()
      var message = $('#commentfield').val()
      var data = { name: name,
                   phone: tel,
                   email: email,
                   message: message,
                   listingID: this.listing_id,
                   vendorID: this.vendor_id,
                   agentID: this.agent_id,
                   origin: this.site_id,
                   session: this.retsly.sid
                 }

      var val = validateform()
      this.form.validateAll(function(err, valid, msg) {
        if(!valid) return

        this.retsly.post('/api/v1/lead/', data, success)
        function success(res) {
          if (res.success) {
            cookie('name', res.bundle.name)
            cookie('phone', res.bundle.phone)
            cookie('email', res.bundle.email)
          }
        }
      })
    }

    function validateform() {
      var form = $('#lead')[0]

      this.form = validate(form)
        .on('all')
        .set({ validateEmpty: true })

        .field('name')
          .is('required', 'Name field cannot be empty')

        .field('email')
          .is('required', 'Email field cannot be empty')
          .is('email', 'please enter a valid email')

        .field('phone')
          .is('required', 'Tel# field cannot be empty')

      return this
    }
  }
  return Components
}