.PHONY: all

run-dev:
	npm run dev

build:
	npm install && npm run build

deploy: build
	npm run deploy
