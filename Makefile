
build: components index.js templates/template.js
	@component build --dev

templates/template.js:
	@echo "module.exports =" > templates/template.js
	@jade -Dc < templates/template.jade >> templates/template.js

components: component.json
	@component install --dev

test: build 
	@mocha-phantomjs test/test.html

clean:
	rm -fr build components template.js

.PHONY: clean test
