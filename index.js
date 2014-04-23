/**
 * Dependencies
 */
var $ = require('jquery')
  , _ = require('underscore')
  , Backbone = require('backbone')
  , validate = require('validate-form')
  , template = require('./templates/template');
  
require('jquery.cookie');
Backbone.$ = $;

module.exports = function(opts) {

  if(!opts) throw new Error('no options passed into retsly-js-leads');
  if(!opts.domain) throw new Error('no domain passed into retsly-js-leads');
  if(!opts.agent_id) throw new Error('no agent_id passed into retsly-js-leads');
  if(!opts.vendor_id) throw new Error('no vendor_id passed into retsly-js-leads');
  if(!opts.listing_id) throw new Error('no listing_id passed into retsly-js-leads');
  if(!opts.retsly) throw new Error('no instance of Retsly passed into retsly-js-leads');

  var Components = {};
  var domain = opts.domain;
  var retsly = opts.retsly;
  var agent_id = opts.agent_id;
  var vendor_id = opts.vendor_id;
  var listing_id = opts.listing_id;

  /**
   * Sets up the backbone view and pushes in the template.
   */
  Components.ContactForm = Backbone.View.extend({

    events: {
      'click .send-button': 'submit',
      'click #commentSpan': 'showCommentBox'
    },

    initialize: function(opts){

      var opts = $.merge(opts, {});
      if(!opts || typeof opts === 'undefined')
        throw new Error('form could not be loaded into retsly-js-leads');
      if(!opts.el) throw new Error('no page el passed into retsly-js-leads');

      $(opts.el).append(this.$el);
      this.$el.append(template);
      var thisElement = this.$el;

      checkCookie(thisElement);

      /**
       * Checks to see if cookie has been set with
       * name, tel, email and loads it into form
       */
      function checkCookie() {

        if($.cookie('name')) {
          thisElement.find('#namefield').val($.cookie('name'));
        }
        if($.cookie('email')) {
          thisElement.find('#emailfield').val($.cookie('email'));
        }
        if($.cookie('phone')) {
          thisElement.find('#telfield').val($.cookie('phone'));
        }
      }
    },

    showCommentBox: function(e) {
      $('#commentfield').slideToggle(150);
    },

    /**
     * submit form only when validations pass.
     */
    submit: function(evt) {

      evt.preventDefault();
      this.validateform();

      $('form #listing_id').val(opts.listing_id);
      $('form #vendor_id').val(opts.vendor_id);
      $('form #agent_id').val(opts.agent_id);

      this.form.validateAll(function(err, valid, msg) {
        if(!valid) {
          return this.alert('Please complete the required fields in the form', 'error');
        }
        else {
          var data = $('#lead').serialize();
          var url = domain+'/leads';
          $.ajax({
            type: 'POST',
            data: data,
            url: url,
            success: function(res) {
              $.cookie('name', res.bundle.name);
              $.cookie('phone', res.bundle.phone);
              $.cookie('email', res.bundle.email);
            },
            error: function (xhr,err) {throw new Error(err);}
          });
        }
      });
    },

    validateform: function(){

      var form = $('#lead')[0];

      this.form = validate(form)
        .on('all')
        .set({ validateEmpty: true })

        .field('name')
          .is('required', 'Name field cannot be empty')

        .field('email')
          .is('required', 'Email field cannot be empty')
          .is('email', 'please enter a valid email')

        .field('phone')
          .is('required', 'Tel# field cannot be empty');

      return this;
    }
  });
  return Components;
};