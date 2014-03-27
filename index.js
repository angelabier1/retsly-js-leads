/**
 * Leads Component
 */
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var template = require('./templates/template');
var validate = require('validate-form');
var Retsly = require('retsly-sdk');
var token = '5OylUxE1Z3T8u3Fbcy8LLUJeao5IidzW';
var stgUrl = 'https://stg.rets.io:443';
var devUrl = 'https://dev.rets.io:443';
var productionUrl = 'https://rets.io:443';

var retsly = Retsly.create(token, {debug: true});

var domain = productionUrl;
if (~document.domain.indexOf('dev.rets')) domain = devUrl;
if (~document.domain.indexOf('stg.rets')) domain = stgUrl;
if (~document.domain.indexOf('localhost')) domain = devUrl;

Backbone.$ = $;

var Components = {};

/**
 * Sets up the backbone view and pushes in the template.
 */
Components.ContactForm = Backbone.View.extend({

  events: {
    'click input[type=submit]': 'submit'
  },

  initialize: function(opts){

    var opts = $.merge(opts, {});

    if(!opts || typeof opts === 'undefined')
      throw new Error('form could not be loaded');

    $(opts.el).append(this.$el);
    this.$el.html(template);
  },

  /**
   * submit form only when validations pass.
   */
  submit: function(evt) {

    evt.preventDefault();
    this.validateform();

    this.form.validateAll(function(err, valid, msg) {
      if(!valid) {
        return this.alert('Please complete the required fields in the form', 'error');
      }
      else {
        var data = $('#lead').serialize();
        $.ajax({
          type: 'POST',
          data: data,
          url: domain+"/api/v1/lead/create?access_token="+token,
          xhrFields: { withCredentials: true },
	  crossDomain: true,
          beforeSend: function( xhr ) {
            xhr.withCredentials = true;
	    xhr.setRequestHeader("cookie", document.cookie);
          },
          error: function (xhr,err) {throw new Error(err)}
        });
      }
    });
  },

  validateform: function(){

    var form = $('#lead')[0];

    this.form = validate(form)
      .on('blur')
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

module.exports = Components;
