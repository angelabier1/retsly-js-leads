var $ = require('dom')
var validate = require('validate-form')
var template = require('./templates/template')
var ajax = require('ajax')
var cookie = require('cookie')

module.exports = function(opts) {
  if(!opts) throw new Error('no options passed into retsly-js-leads')
  if(!opts.domain) throw new Error('no domain passed into retsly-js-leads')
  if(!opts.agent_id) throw new Error('no agent_id passed into retsly-js-leads')
  if(!opts.vendor_id) throw new Error('no vendor_id passed into retsly-js-leads')
  if(!opts.listing_id) throw new Error('no listing_id passed into retsly-js-leads')

  this.domain = opts.domain
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
                   origin: this.site_id
                  }
      var url = this.domain+'/leads'

      var val = validateform()
      this.form.validateAll(function(err, valid, msg) {
        if(!valid) {
          return
        } else {
          ajax({
            type: 'POST',
            data: data,
            url: url,
            success: function(res) {
              var responseObj = JSON.parse(res)
              cookie('name', responseObj.bundle.name)
              cookie('phone', responseObj.bundle.phone)
              cookie('email', responseObj.bundle.email)
            }
          })
        }
      })
    }

    function validateform() {
      var form = $('#lead')[0]

      this.form = validate(form)
        .on('all')
        .set({ validateEmpty: true })

        .field('name')
          .is('required', 'Please enter your name.')

        .field('phone')
          .is('required', 'Please enter your phone number.')
          .is(/^(1\s*[-\/\.]?)?(\((\d{3})\)|(\d{3}))\s*[-\/\.]?\s*(\d{3})\s*[-\/\.]?\s*(\d{4})\s*(([xX]|[eE][xX][tT])\.?\s*(\d+))*$/, 
            'Please enter a valid phone number.')

        .field('email')
          .is('required', 'Please enter your email.')
          .is(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,4}$/,
            'Please enter a valid email.')

      return this
    }
  }
  return Components
}