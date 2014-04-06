
build: components
	@component build --dev

template: template.html
	@component convert $<

components: component.json
	@component install --dev

test: build 
	@mocha-phantomjs test/test.html

clean:
	rm -fr build components template

.PHONY: clean test
