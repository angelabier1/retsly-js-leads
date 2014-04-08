/**
 * Dependencies
 */
var Component = require('retsly-leads');
var Backbone = require('backbone');
var assert = require('assert');
var opts = {};
opts.domain = 'https://dev.rets.io';
var Retsly = require('retsly-sdk');
opts.retsly = new Retsly('5OylUxE1Z3T8u3Fbcy8LLUJeao5IidzW', { debug: true });
opts.agent_id = "532d4cc58b0b042a02aeb469";
opts.vendor_id = "test";
opts.listing_id = "532d4cc68b0b042a02aebd38";
var Leads = require('retsly-leads')(opts);

suite('Exports Modules');

  test('Exports Contact form view', function() {
    assert(typeof Leads.ContactForm === 'function');
  });

  test('has an events object', function() {
    var cf = new Leads.ContactForm({ el: 'el' });
    assert(typeof cf.events === 'object');
  });

suite('ContactForm');
  test('Throws if contact form element not passed in', function() {
    assert.throws(function() {
      new Leads.ContactForm();
    });
  });

  test('Loads contact form when element passed in', function() {
      new Leads.ContactForm({el: '#test'});
  });

  test('Has a validateForm Function', function() {
      var cf = new Leads.ContactForm({el: '#test'});
      assert(typeof cf.validateform === 'function');
  });

  test('Has a submit Function', function() {
      var cf = new Leads.ContactForm({el: '#test'});
      assert(typeof cf.submit === 'function');
  });
