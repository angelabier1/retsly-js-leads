/**
 * Dependencies
 */
var assert = require('assert');
var opts = {};
opts.domain = 'https://dev.rets.io';
opts.retsly = {'sid': ''}
opts.agent_id = "532d4cc58b0b042a02aeb469";
opts.vendor_id = "test";
opts.listing_id = "532d4cc68b0b042a02aebd38";
opts.lead_endpoint = "/leads";

var Leads = require('retsly-js-leads')(opts);

suite('Exports Modules');

  test('Exports Contact form view', function() {
    assert(typeof Leads.ContactForm === 'function');
  });

suite('ContactForm');
  test('Throws if contact form element not passed in', function() {
    assert.throws(function() {
      new Leads.ContactForm();
    });
  });

  test('Loads contact form when element passed in', function() {
      new Leads.ContactForm('#test');
  });
