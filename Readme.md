
# retsly-js-leads

  UI for creating leads on Retsly

## Installation

  Install with [component(1)](http://component.io):

    $ component install retsly/retsly-js-leads

## Usage
```
  // Lead form config
  var retsly = require('retsly-js-sdk');

  var opts = {};

  opts.retsly = retsly;
  opts.agent_id = '123'
  opts.vendor_id = '456'
  opts.listing_id = '789'
  opts.site_id = '000'
  opts.lead_endpoint = '/leads'

  var Leads = require('retsly-js-leads')(opts)
  var leads = new Leads.ContactForm('.my-leads-el')
```


## Version

  0.1.2

## Dev

  To create a test build of the leads input component (accessible at test.html), use `$ component build --dev`.

### Repo Owner
---
[@switters](https://github.com/switters)


## License

  MIT
