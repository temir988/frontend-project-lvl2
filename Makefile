install: install-deps

run:
	bin/gendiff.js

install-deps:
	npm ci

test:
	npm test

lint:
	npx eslint .
