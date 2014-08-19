var $ = window.$ = require('dom')
var validate = require('validate-form')
var template = require('./templates/template')
var ajax = require('ajax')
var cookie = require('cookie')
var progressCompleted = false;

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

    $('#tab-right-bar .send-button').on('click', function(e) {
      e.preventDefault()
      submitForm()
    })

    var thisElement = $('.presented-by').find('#lead')
    checkCookie(thisElement)

    // 1.Preload input fields if cookie exists with name, email, phone
    // 2.Hides fields if this listing ID has been contacted.
    function checkCookie() {
      if(!cookie(opts.listing_id)){
        if(cookie('name')) {
        thisElement.find('#namefield').val(cookie('name'))
        }
        if(cookie('email')) {
          thisElement.find('#emailfield').val(cookie('email'))
        }
        if(cookie('phone')) {
          thisElement.find('#telfield').val(cookie('phone'))
        }
      } else {
        CompleteForm("You have already contacted this agent");
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

        // progress bar animation
        startProgressAnimation();

        this.retsly.post('/api/v1/lead/', data, success)

        function success(res) {
          if (res.success){
            cookie('name', res.bundle.name);
            cookie('phone', res.bundle.phone);
            cookie('email', res.bundle.email);
            cookie(opts.listing_id, true, {maxage:60*60}); // Sets listing ID as cookie
          } else {
            $('.header-text').text('Sorry, please try again.');
          }
        }
      })
    }

    //Fake Progress Bar Animation
    function startProgressAnimation(){
      
      $('#progress-bar').css('display','block');

      var interval = setInterval(function(){
        var barWidthPX = $('#progress-bar').css('width');
        var totalWidthPX = $('#tab-right-bar').css('width');
        var barWidth = parseInt(barWidthPX.replace(/\D/g,''));
        var totalWidth = parseInt(totalWidthPX.replace(/\D/g,''));
        var finalWidth = totalWidth;
        if(barWidth > totalWidth){
          CompleteForm("Thank you, your message has been sent");
          clearInterval(interval);
        } else {
          $('#progress-bar').css('width',(barWidth/totalWidth*100)+Math.floor((Math.random()*50)+1)+"%");
        } 
      },50);
    }

    //Completed form animation and message Change
    function CompleteForm(message){
      $('#form-body').addClass('completeAnimation');
      $('.header-text').text(message);
    }

    function validateform() {
      var form = $('#lead')[0]

      this.form = validate(form)
        .on('all')
        .set({ validateEmpty: true })

        .field('name')
          .is('required', 'Please enter your name.')

        .field('phone')
          .is('required', "Please enter your phone number.")
          .is(/^(1\s*[-\/\.]?)?(\((\d{3})\)|(\d{3}))\s*[-\/\.]?\s*(\d{3})\s*[-\/\.]?\s*(\d{4})\s*(([eE][xX][tT])\.?\s*(\d+))*$/,
            "Please enter a valid phone number (+ opt. 'ext. 999').")

        .field('email')
          .is('required', 'Please enter your email.')
          .is(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]{2,}$/,
            'Please enter a valid email.')

      return this
    }
  }
  return Components
}