/**
 * Dependencies
 */
var Component = require('retsly-leads');
var Backbone = require('backbone');
var assert = require('assert');

suite('Component');
  test('exports', function() {
    assert(typeof Component === 'object');
  });

  test('Exports Contact form view', function() {
    assert(typeof Component.ContactForm === 'function');
  });

  test('has an events object', function() {
    var cf = new Component.ContactForm({ x: '' });
    assert(typeof cf.events === 'object');
  });

suite('ContactForm');
  test('Throws if contact form element not passed in', function() {
    assert.throws(function() {
      new Component.ContactForm();
    });
  });

  test('Loads contact form when element passed in', function() {
      new Component.ContactForm({el: '#test'});
  });

  test('Has a validateForm Function', function() {
      var cf = new Component.ContactForm({el: '#test'});
      assert(typeof cf.validateform === 'function');
  });

  test('Has a submit Function', function() {
      var cf = new Component.ContactForm({el: '#test'});
      assert(typeof cf.submit === 'function');
  });
