/**
 * Leads Component
 */
var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var Retsly = require('retsly-sdk');
var template = require('./templates/template');
var validate = require('validate-form');
var token = '5OylUxE1Z3T8u3Fbcy8LLUJeao5IidzW';

//var retsly = Retsly.create('5OylUxE1Z3T8u3Fbcy8LLUJeao5IidzW', { debug: true });

Backbone.$ = $;

var Components = {};

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

  submit: function(evt) {

    evt.preventDefault();

    this.validateform();

    this.form.validateAll(function(err, valid, msg) {
      if(!valid) {
        return this.alert('The form is not complete, please try again', 'error');
      }
      else {
        $('#lead').get(0).setAttribute('action', 'https://dev.rets.io/api/v1/lead/create?access_token=' + token);
        $('#lead').submit()
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